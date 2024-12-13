import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB =async(payload:TAcademicSemester)=>{
// semister name --> semister code


if(academicSemesterNameCodeMapper[payload.name]!== payload.code){
throw new Error('Invalid Semester Code')
}
    const result = await AcademicSemester.create(payload);
    return result;

}


const getAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id:id });
  return result;
};
const patchAcademicSemesterFromDB = async (id: string,payload:Partial<TAcademicSemester>) => {
  if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name]!== payload.code){
    throw new Error('Invalid Semeter Code')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id:id },payload,{new:true});
  return result
};
const deleteAcademicSemestersFromDB = async (id: string) => {
  const result = await AcademicSemester.deleteOne({ _id:id });
  return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    patchAcademicSemesterFromDB,
    deleteAcademicSemestersFromDB

}
