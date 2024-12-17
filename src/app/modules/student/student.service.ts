import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query:Record<string,unknown>) => {
  //{email:{$regex:query.searchTerm,$options:i}}
  const objQuery = {...query}
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }

  const studentSearchField =['email','name.firstName','presentAddress'];
  const searchQuery =Student.find({
    $or:studentSearchField.map((field)=>({
      [field]:{$regex:searchTerm,$options:'i'}
    }))
  })

  const excludeField = ['searchTerm','sort','fields','page','skip','limit']
    excludeField.forEach((el)=>delete objQuery[el])

  const filterQuery = searchQuery.find(objQuery).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  let sort = '-createdAt';
if(query.sort){
  sort = query.sort as string
}
const sortQuery =  filterQuery.sort(sort)

let page = 1;
let limit = 1;
let skip = 0;
if(query.limit){
  limit = query.limit as number;
}
if(query.page){
  page = query.page as number;
  skip = (page-1)*limit;
}
const paginateQuery = sortQuery.skip(skip)
const limitQuery = paginateQuery.limit(limit);
//field limiting
let fields =  "-__v";
if(query.fields){
  fields= (query.fields as string).split(',').join(' ')
}
 const fieldQuery = await limitQuery.select(fields)
  return fieldQuery;
};




const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({id}).populate('admissionSemester').populate({
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
  const result = await Student.findOneAndUpdate({ id},modifiedUpdatedData,{ new: true,runValidators:true });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
    const existingStudent = await Student.findOne({id}); // Use the static method
    if (!existingStudent) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
    }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      {id},
      {isDeleted:true},
      {new:true,session});
    if(!deletedStudent){
      throw new AppError(StatusCodes.BAD_REQUEST,'Failed to student delete')
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      {isDeleted:true},
      {new:true,session});
     if(!deletedUser){
      throw new AppError(StatusCodes.BAD_REQUEST,'Failed to student delete')
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
