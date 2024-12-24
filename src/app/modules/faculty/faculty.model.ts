import { Schema,model } from 'mongoose';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';
import { TFaculty,TUserName } from './faculty.interface';


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



const facultySchema = new Schema<TFaculty>({
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
  academicDepartment:{
    type:Schema.Types.ObjectId,
    ref:'AcademicDepartment'
  },
  academicFaculty:{
    type:Schema.Types.ObjectId,
    ref:'AcademicFaculty'
  },
     isDeleted: {
      type: Boolean,
      default: false,
    },
},{
    timestamps:true
});

facultySchema.pre('aggregate',function(next){
this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});
next();
});
facultySchema.statics.isFacultyExists =async function (id:string){
  const existingFaculty = await Faculty.findOne({id})
  return existingFaculty;
}
facultySchema.pre('save', async function (next) {
    const existingFaculty = await Faculty.findOne({ email: this.email });
    if (existingFaculty) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Email already exists')
    }
    next();
  }
);
export const Faculty = model<TFaculty>('Faculty', facultySchema);