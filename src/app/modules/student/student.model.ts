import { Schema,model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';





const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent>({
  id: { type: String },
  user: {
    type:Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref:' User',
  },

  name: userNameSchema,
  gender: {
    type:String,
    enum:['male', 'female','other'],
    required:true
  },
  dateOfBirth: { type: String},
  email: { type: String, required: true,unique:true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type:String,
    enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuradianSchema,
   isDeleted: {
      type: Boolean,
      default: false,
    },
  profileImg: { type: String },
  academicDepartment:{
    type:Schema.Types.ObjectId,
    ref:'AcademicDepartment'
  },
  admissionSemester:{
    type:Schema.Types.ObjectId,
    ref:'AcademicSemester'
  }
});
studentSchema.virtual('fullName').get(function (){
  return this?.name?.firstName+this?.name?.middleName+this?.name?.lastName
})
studentSchema.pre('aggregate',function(next){
this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});
next();
});
studentSchema.statics.isUserExists =async function (id:string){
  const existingUser = await Student.findOne({id})
  return existingUser;
}
studentSchema.pre('save', async function (next) {
    const existingStudent = await Student.findOne({ email: this.email });
    if (existingStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Email already exists')
    }
    next();
  }
);
export const Student = model<TStudent>('Student', studentSchema);
