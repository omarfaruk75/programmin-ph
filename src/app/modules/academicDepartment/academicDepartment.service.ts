
import QueryBuilder from "../../builder/QueryBuilder";
import { departmentSearchableField } from "./academicDepartment.constant";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDB =async(payload:TAcademicDepartment)=>{
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getAcademicDepartmentsFromDB = async (query:Record<string,unknown>) => {
  const departmentQuery = new QueryBuilder(AcademicDepartment.find().populate('academicFaculty'), query)
    .search(departmentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await departmentQuery.modelQuery;
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentFromDB = async (id: string,payload:Partial<TAcademicDepartment>) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload,{new:true});
  return result
};


export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentFromDB
}
