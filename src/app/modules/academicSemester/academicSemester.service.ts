
import AppError from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import {StatusCodes} from 'http-status-codes';

const createAcademicSemesterIntoDB =async(payload:TAcademicSemester)=>{
// semister name --> semister code


if(academicSemesterNameCodeMapper[payload.name]!== payload.code){
throw new AppError(StatusCodes.NOT_FOUND,'Invalid Semester Code')
}
    const result = await AcademicSemester.create(payload);
    return result;

}


const getAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById({ id });
  return result;
};
const updateAcademicSemesterFromDB = async (id: string,payload:Partial<TAcademicSemester>) => {
  if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name]!== payload.code){
    throw new AppError(StatusCodes.NOT_FOUND,'Invalid Semeter Code')
  }
  const result = await AcademicSemester.findByIdAndUpdate({id },payload,{new:true});
  return result
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterFromDB

}
