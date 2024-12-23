import QueryBuilder from "../../builder/QueryBuilder";
import { academicFacultySearchableField } from "./academicFaculty.constant";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB =async(payload:TAcademicFaculty)=>{
    const result = await AcademicFaculty.create(payload);
    return result;
}

const getAcademicFacultiesFromDB = async (query:Record<string,unknown>) => {
  const facultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(academicFacultySearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};
 

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateAcademicFacultyFromDB = async (id: string,payload:Partial<TAcademicFaculty>) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {new:true});
  return result
};


export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyFromDB
}
