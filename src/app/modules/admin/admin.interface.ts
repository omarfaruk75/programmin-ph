import { Types } from 'mongoose';


export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};


export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  role:string;
  designation:string;
  name: TUserName;
  gender: 'male' | 'female'|'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted:boolean,
  createdAt:Date,
  updatedAt:Date
};