
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { facultySearchableField } from "../academicFaculty/academicFaculty.constant";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { academicSemesterNameCodeMapper, semesterSearchableField } from "./academicSemester.constant";
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


const getAcademicSemestersFromDB =async (query:Record<string,unknown>) => {
  const semesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(semesterSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterQuery.modelQuery;
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById( id );
  return result;
};
const updateAcademicSemesterFromDB = async (id: string,payload:Partial<TAcademicSemester>) => {
  if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name]!== payload.code){
    throw new AppError(StatusCodes.NOT_FOUND,'Invalid Semeter Code')
  }
  const result = await AcademicSemester.findByIdAndUpdate(id,payload,{new:true});
  return result
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterFromDB

}
