/* eslint-disable no-unused-expressions */
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'student';
  //set manually id
  userData.id = '20300001';
  //create a user
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    (studentData.id = newUser.id), (studentData.user = newUser._id); //referrence id

    //create new Student
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
