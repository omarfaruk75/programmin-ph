/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { generateAdminId, generateAllUser, generateFacultyId, generateStudentId } from './user.utils';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';


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
const createFacultyIntoDB = async (password: string, payload:TFaculty) => {
    const userData: Partial<TUser>= {};

    userData.password = password || (config.default_pass as string);
    userData.role = 'faculty'
    // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
    const session = await mongoose.startSession(); 
    try {
        //transaction-1
        session.startTransaction();
         // find academic department info
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment,);
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
           //set  generated id
        userData.id = await generateFacultyId();
        const newUser = await User.create([userData],{session});
        if (!newUser.length) {
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create new user')
        }
    payload.user = newUser[0]._id; //referrence id
    payload.id = newUser[0].id;
    //create new Faculty
    //transaction-2
   const newFaculty = await Faculty.create([payload],{session});
    if (!newFaculty.length) {
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create new Faculty')
    } 
        await session.commitTransaction();
        await session.endSession();
        return newFaculty;

} catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
}
};
const createAdminIntoDB = async (password: string, payload:TAdmin) => {
    const userData: Partial<TUser>= {};

    userData.password = password || (config.default_pass as string);
    userData.role = 'admin'
    // Find academic semester
    
    const session = await mongoose.startSession(); 
    try {
        //transaction-1
        session.startTransaction();
           //set  generated id
        userData.id = await generateAdminId();
        const newUser = await User.create([userData],{session});
        if (!newUser.length) {
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create new user')
        }
    payload.user = newUser[0]._id; //referrence id
    payload.id = newUser[0].id;
    //create new Faculty
    //transaction-2
   const newAdmin = await Admin.create([payload],{session});
    if (!newAdmin.length) {
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create new Admin')
    } 
        await session.commitTransaction();
        await session.endSession();
        return newAdmin;

} catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
}
};
export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};
