import { Schema,model } from 'mongoose';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import { TAdmin, TUserName } from './admin.interface';



const facultyNameSchema = new Schema<TUserName>({
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



const adminSchema = new Schema<TAdmin>({
  id: { type: String },
  user: {
    type:Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref:' User',
  },
  role:{
    type:String,
    required:true,
  },
  designation:{
    type:String,
    required:true
  },

  name: facultyNameSchema,
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
  profileImg: { type: String },
  isDeleted: {type: Boolean,default: false},
},
{
    timestamps:true
});

adminSchema.pre('aggregate',function(next){
this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});
next();
});
adminSchema.statics.isAdminExists =async function (id:string){
  const existingAdmin = await Admin.findOne({id})
  return existingAdmin;
}
adminSchema.pre('save', async function (next) {
    const existingAdmin = await Admin.findOne({ email: this.email });
    if (existingAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Email already exists')
    }
    next();
  }
);
export const Admin = model<TAdmin>('Admin',adminSchema);
