/* eslint-disable no-unused-expressions */
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData:TStudent) => {
  try {
    const userData: Partial<TUser>= {};
  userData.id = '20300001abc';
  userData.password = password || (config.default_pass as string);
  userData.role = 'student'
  //set manually id


  //create a user

  const newUser = await User.create(userData);
  

  if (Object.keys(newUser).length) {

    studentData.user = newUser._id; //referrence id
    studentData.id = newUser.id;

    //create new Student
   const newStudent = await Student.create(studentData);

    return newStudent;
  }
  } catch (error) {
    console.log(error);
  }
};

export const userService = {
  createStudentIntoDB,
};
