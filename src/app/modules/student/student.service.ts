import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './student.constant';


const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // Build the query using QueryBuilder
  const studentQuery = new QueryBuilder(Student.find().populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  }), query)
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  return result;
};
const updateStudentIntoDB = async (id: string,payload:Partial<TStudent>) => {
  const {name,guardian,localGuardian, ...remainigStudentData}=payload;
 const modifiedUpdatedData:Record<string,unknown>={
  ...remainigStudentData,
 } 
if(name && Object.keys(name).length){
  for(const[key,value] of Object.entries(name)){
    modifiedUpdatedData[`name.${key}`]=value;
  }
}
if(guardian && Object.keys(guardian).length){
  for(const[key,value] of Object.entries(guardian)){
    modifiedUpdatedData[`guardian.${key}`]=value;
  }
}
if(localGuardian && Object.keys(localGuardian).length){
  for(const[key,value] of Object.entries(localGuardian)){
    modifiedUpdatedData[`localGuardian.${key}`]=value;
  }
}
  const result = await Student.findByIdAndUpdate(id,modifiedUpdatedData,{ new: true,runValidators:true });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
    const existingStudent = await Student.findById(id); // Use the static method
    if (!existingStudent) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
    }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      {isDeleted:true},
      {new:true,session});
    if(!deletedStudent){
      throw new AppError(StatusCodes.BAD_REQUEST,'Failed to student delete')
    }
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
     userId,
      {isDeleted:true},
      {new:true,session});
     if(!deletedUser){
      throw new AppError(StatusCodes.BAD_REQUEST,'Failed to user delete')
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB
};
