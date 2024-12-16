
import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import {StatusCodes} from 'http-status-codes';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required:true,
      unique:true
    },
  },
  {
    timestamps: true,
  }, 
);

academicFacultySchema.pre('save',async function (next){
       const isFacultyExists = await AcademicFaculty.findOne({
        name:this.name
    })
    if(isFacultyExists){
        throw new AppError(StatusCodes.OK,'This Faculty is already Exist')
    }
    next()
})
academicFacultySchema.pre('findOneAndUpdate',async function (next){
    const query = this.getQuery();
       const isFacultyExists = await AcademicFaculty.findOne(query)
    if(!isFacultyExists){
        throw new AppError(StatusCodes.NOT_FOUND,'This Faculty does not Exist')
    }
    next()
})

export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);
