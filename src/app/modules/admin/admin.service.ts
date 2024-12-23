import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../user/user.model';
import { Admin } from './admin.model';
import { adminSearchableField } from './admin.constant';
import { TAdmin } from './admin.interface';


const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  // Build the query using QueryBuilder
  const adminQuery = new QueryBuilder(Admin.find()
//   .populate('managementDepartment')
 , query)
    .search(adminSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({id})
//   .populate('managementDepartment')
;
  return result;
};
const updateAdminIntoDB = async (id: string,payload:Partial<TAdmin>) => {
  const {name, ...remainigAdminData}=payload;
 const modifiedUpdatedData:Record<string,unknown>={
  ...remainigAdminData,
 } 
if(name && Object.keys(name).length){
  for(const[key,value] of Object.entries(name)){
    modifiedUpdatedData[`name.${key}`]=value;
  }
}
  const result = await Admin.findOneAndUpdate({id:id},modifiedUpdatedData,{ new: true,runValidators:true });
  return result;
};
const deleteAdminFromDB = async (id: string) => {
  const existingAdmin = await Admin.findOne({id}); // Use the static method
  // const existingAdmin = await Admin.findById(id); // Use the static method
    if (!existingAdmin) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found');
    }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const deletedAdmin = await Admin.findByIdAndUpdate(
    const deletedAdmin = await Admin.findOneAndUpdate(
      {id:id},
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Admin');
    }

    // get user _id from deletedFaculty
    // const userId = deletedFaculty.user;;
    const userId = deletedAdmin.id;

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

    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AdminServices = {
 getAllAdminsFromDB,
getSingleAdminFromDB,
updateAdminIntoDB,
 deleteAdminFromDB
};
