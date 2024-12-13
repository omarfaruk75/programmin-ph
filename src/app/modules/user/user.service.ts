/* eslint-disable no-unused-expressions */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';

// const createStudentIntoDB = async (password: string, payload:TStudent) => {
//   try {
//     const userData: Partial<TUser>= {};
// if (!payload.admissionSemester) {
//       throw new Error('Admission semester is missing.');
//     }

//     // Find academic semester
//     const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

//     if (!admissionSemester) {
//       throw new Error('Admission semester not found.');
//     }

//     const studentId = generateStudentId(admissionSemester);
// if (!studentId) {
//     throw new Error('Failed to generate student ID.');
// }
// userData.id = studentId;
//   // userData.id = generateStudentId(admissionSemester);

//   userData.password = password || (config.default_pass as string);

//   userData.role = 'student'
//   //set manually id


//   //create a user

//   const newUser = await User.create(userData);
  

//   if (Object.keys(newUser).length) {

//     payload.user = newUser._id; //referrence id
//     payload.id = newUser.id;

//     //create new Student
//    const newStudent = await Student.create(payload);

//     return newStudent;
//   }
//   } catch (error) {
//     console.log(error);
//   }
// };
const createStudentIntoDB = async (password: string, payload: TStudent) => {
    if (!payload.admissionSemester || !mongoose.Types.ObjectId.isValid(payload.admissionSemester)) {
        throw new Error('Invalid or missing admission semester.');
    }

    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new Error('Admission semester not found.');
    }

    const studentId = await generateStudentId(admissionSemester); // Await the promise
    if (!studentId) {
        throw new Error('Failed to generate student ID.');
    }

    const userData: Partial<TUser> = {
        id: studentId,
        password: password || config.default_pass as string,
        role: 'student',
    };

    try {
        const newUser = await User.create(userData);
        payload.user = newUser._id;
        payload.id = newUser.id;

        const newStudent = await Student.create(payload);
        return newStudent;
    } catch (error) {
       console.log(error);
    }
};

export const userService = {
  createStudentIntoDB,
};

