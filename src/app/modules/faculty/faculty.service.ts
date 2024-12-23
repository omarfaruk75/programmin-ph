import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { facultySearchableField } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { User } from '../user/user.model';


const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  // Build the query using QueryBuilder
  const facultyQuery = new QueryBuilder(Faculty.find().populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  }), query)
    .search(facultySearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({id}).populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  return result;
};
const updateFacultyIntoDB = async (id: string,payload:Partial<TFaculty>) => {
  const {name, ...remainigFacultyData}=payload;
 const modifiedUpdatedData:Record<string,unknown>={
  ...remainigFacultyData,
 } 
if(name && Object.keys(name).length){
  for(const[key,value] of Object.entries(name)){
    modifiedUpdatedData[`name.${key}`]=value;
  }
}
  const result = await Faculty.findOneAndUpdate({id:id},modifiedUpdatedData,{ new: true,runValidators:true });
  return result;
};
const deleteFacultyFromDB = async (id: string) => {
  const existingFaculty = await Faculty.findOne({id}); // Use the static method
  // const existingFaculty = await Faculty.findById(id); // Use the static method
    if (!existingFaculty) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found');
    }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const deletedFaculty = await Faculty.findByIdAndUpdate(
    const deletedFaculty = await Faculty.findOneAndUpdate(
      {id:id},
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete faculty');
    }

    // get user _id from deletedFaculty
    // const userId = deletedFaculty.user;;
    const userId = deletedFaculty.id;

    // const deletedUser = await User.findByIdAndUpdate(

    const deletedUser = await User.findOneAndUpdate(
      
    {id:userId},
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB
};
