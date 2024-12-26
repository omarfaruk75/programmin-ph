import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import {StatusCodes} from 'http-status-codes';

const createSemesterRegistrationIntoDB = async(payload:TSemesterRegistration)=>{
    const academicSemester = payload?.academicSemester;
    const isAcademicSemeterExists = await AcademicSemester.findById(academicSemester)
    if(!isAcademicSemeterExists){
    throw new AppError(StatusCodes.NOT_FOUND,'This Acadmic Semester is not found')
} 

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})
if(isSemesterRegistrationExists){
    throw new AppError(StatusCodes.CONFLICT,'This Acadmic Semester is already Registerd')
}

const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or:[
        {status:RegistrationStatus.UPCOMING},
        {status:RegistrationStatus.ONGOING}  
    ]
})
if(isThereAnyUpcomingOrOngoingSemester){
    throw new AppError(StatusCodes.BAD_REQUEST,
        `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester exists`
    )
}
  const result =await SemesterRegistration.create(payload);
  return result;
}


const getSemesterRegistrationsFromDB =async (query:Record<string,unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById( id );
  return result;
};
const updateSemesterRegistrationFromDB = async (id: string,payload:Partial<TSemesterRegistration>) => {

const isSemisterRegistrationExists= await SemesterRegistration.findById(id)
    if(!isSemisterRegistrationExists){
        throw new AppError(StatusCodes.NOT_FOUND,"This semester id is not found")
    }

const currentSemesterStatus = isSemisterRegistrationExists?.status;
const requestedStatus = payload?.status;
if(currentSemesterStatus==='ENDED'){
    throw new AppError(StatusCodes.BAD_REQUEST,`This semester id already ${currentSemesterStatus}`)

}
//UPCOMING=>ONGOING=>ENDED
if(currentSemesterStatus ===RegistrationStatus.UPCOMING && requestedStatus ===RegistrationStatus.ENDED){
    throw new AppError(StatusCodes.BAD_REQUEST,`you can not directly updated from ${currentSemesterStatus} to ${requestedStatus}`)
}
if(currentSemesterStatus ===RegistrationStatus.ONGOING && requestedStatus ===RegistrationStatus.UPCOMING){
    throw new AppError(StatusCodes.BAD_REQUEST,`you can not directly updated from ${currentSemesterStatus} to ${requestedStatus}`)
}
  const result = await SemesterRegistration.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
  return result
};
export const SemesterRegistrationServices= {
    createSemesterRegistrationIntoDB,getSemesterRegistrationsFromDB,getSingleSemesterRegistrationFromDB,updateSemesterRegistrationFromDB
}