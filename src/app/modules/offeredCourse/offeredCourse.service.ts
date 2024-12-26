

import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";

import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import {StatusCodes} from "http-status-codes"
import { hasTimeConflict } from "./offeredCourse.utils";
const createOfferedCoureseIntoDB =async(payload:TOfferedCourse)=>{
    const {semesterRegistration,academicFaculty,academicDepartment,course,faculty,section,days,startTime,endTime}=payload;
  
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
   if(!isSemesterRegistrationExists){
    throw new AppError(StatusCodes.NOT_FOUND,"Semester Registration is not Found")
   }
   const academicSemester = isSemesterRegistrationExists.academicSemester;
  
    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
   if(!isAcademicFacultyExists){
    throw new AppError(StatusCodes.NOT_FOUND,"Academic Faculty is not Found")
   }
       const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
   if(!isAcademicDepartmentExists){
    throw new AppError(StatusCodes.NOT_FOUND,"Academic Department is not Found")
   }
    const isCourseExists = await Course.findById(course);
   if(!isCourseExists){
    throw new AppError(StatusCodes.NOT_FOUND,"Course is not Found")
   }

    const isFacultyExists = await Faculty.findById(faculty);
   if(!isFacultyExists){
    throw new AppError(StatusCodes.NOT_FOUND,"Faculty is not Found")
   }
   const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({_id:academicDepartment,academicFaculty});
   if(!isDepartmentBelongToFaculty){
    throw new AppError(StatusCodes.NOT_FOUND,`This ${isAcademicDepartmentExists.name} is not belong to ${isAcademicFacultyExists.name}`)
   }
     const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

    // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
    StatusCodes.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

    const result = await OfferedCourse.create({...payload,academicSemester});
    return result;
}
const getAllOfferedCoursesFromDB = async(query:Record<string,unknown>)=>{
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find().populate('academicSemester').populate('academicFaculty').populate('academicDepartment').populate('course'),query)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await offeredCourseQuery.modelQuery;
    return result;
}
const getSingleOfferedCoursesFromDB = async(id:string)=>{
    const result =await OfferedCourse.findById(id).populate('academicSemester').populate('academicFaculty').populate('academicDepartment').populate('course');
    return result
}

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found !');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties


  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistation).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }
}
export const OfferedCourseServices= {
    createOfferedCoureseIntoDB,getAllOfferedCoursesFromDB,getSingleOfferedCoursesFromDB,updateOfferedCourseIntoDB,deleteOfferedCourseFromDB
}