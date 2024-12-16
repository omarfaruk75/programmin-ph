
import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';


const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required:true,
      unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'AcademicFaculty'
    }
  },
  {
    timestamps: true,
  }, 
);

academicDepartmentSchema.pre('save',async function (next){
       const isDepartementExists = await AcademicDepartment.findOne({
        name:this.name
    })
    if(isDepartementExists){
        throw new AppError(StatusCodes.OK,'This Department is already Exist')
    }
    next()
})
academicDepartmentSchema.pre('findOneAndUpdate',async function (next){
    const query = this.getQuery();
       const isDepartementExists = await AcademicDepartment.findOne(query)
    if(!isDepartementExists){
        throw new AppError(StatusCodes.NOT_FOUND,'This Department does not Exist')
    }
    next()
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);
