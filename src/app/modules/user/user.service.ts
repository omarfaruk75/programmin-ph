/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';


const createStudentIntoDB = async (password: string, payload:TStudent) => {
    const userData: Partial<TUser>= {};

    userData.password = password || (config.default_pass as string);
    userData.role = 'student'
    // Find academic semester
    
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    const session = await mongoose.startSession(); 
    try {
        //transaction-1
        session.startTransaction();
        userData.id = await generateStudentId(admissionSemester as TAcademicSemester);
        const newUser = await User.create([userData],{session});
        if (!newUser.length) {
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create new user')
        }
    payload.user = newUser[0]._id; //referrence id
    payload.id = newUser[0].id;
    //create new Student
    //transaction-2
   const newStudent = await Student.create([payload],{session});
    if (!newStudent.length) {
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create new student')
    } 
        await session.commitTransaction();
        await session.endSession();
        return newStudent;

} catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
}
};
export const userService = {
  createStudentIntoDB,
};
