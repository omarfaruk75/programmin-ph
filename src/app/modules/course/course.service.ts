
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model"
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableField } from "./course.constant";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import {StatusCodes} from 'http-status-codes';

const createCoureseIntoDB =async(payload:TCourse)=>{
    const result = await Course.create(payload);
    return result;
}
const getAllCoursesFromDB = async(query:Record<string,unknown>)=>{
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'),query)
    .search(courseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await courseQuery.modelQuery;
    return result;
}
const getSingleCourseFromDB = async(id:string)=>{
    const result =await Course.findById(id).populate('preRequisiteCourses.course');
    return result
}

const updateCourseIntoDB = async(id:string,payload:Partial<TCourse>)=>{
      const {preRequisiteCourses, ...courseRemainingData} = payload;
       const session = await mongoose.startSession(); 
   try {
       session.startTransaction();
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
            new:true,
            runValidator:true,
            session
        }
      
    );
    if(!updatedBasicCourseInfo){
        throw new AppError(StatusCodes.BAD_REQUEST,"Failed to update Course")
    }
    if(preRequisiteCourses && preRequisiteCourses.length>0){
       //filterout the deleted fields
       const deletedPreRequisites = preRequisiteCourses.filter(el=>el.course && el.isDeleted).map(el=>el.course); 
    
       const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
            $pull:{preRequisiteCourses:{course:{$in:deletedPreRequisites}}} 
        },
        {
            new:true,
            runValidator:true,
            session
        }
    );
  if(!deletedPreRequisiteCourses){
        throw new AppError(StatusCodes.BAD_REQUEST,"Failed to delete PreRequisiteCourse")
    }

         const newPreRequisite = preRequisiteCourses?.filter(el=>el.course && !el.isDeleted);
         const newPreRequisiteCourses = await Course.findByIdAndUpdate(
    id,
    {
        $addToSet:{preRequisiteCourses:{$each:newPreRequisite}}
    },
     {
            new:true,
            runValidator:true,
            session
        }
);
  if(!newPreRequisiteCourses){
        throw new AppError(StatusCodes.BAD_REQUEST,"Failed to add PreRequisiteCourse")
    }
 
   const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result;
   } 
    await session.commitTransaction();
    await session.endSession()
   }catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(StatusCodes.BAD_REQUEST,"Failed to add PreRequisiteCourse")
}
}
const deleteCourseFromDB = async(id:string)=>{

    const result =await Course.findByIdAndUpdate(
        id,
        {isDeleted:true}, 
        {new:true}
    )
    return result
}

const facultiesWithCourseIntoDB = async(id:string,payload:Partial<TCourseFaculty>)=>{
 const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
        course:id,
        $addToSet:{faculties:{$each:payload}}
    },
    {upsert:true, new:true}
 )
 return result;
}
const removeFacultiesFromCourseFromDB = async(id:string,payload:Partial<TCourseFaculty>)=>{
 const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
        $pull:{faculties:{$in:payload}}
    },
    { new:true}
 )
 return result;
}

export const CourseServices= {
    createCoureseIntoDB,getAllCoursesFromDB,getSingleCourseFromDB,deleteCourseFromDB
,updateCourseIntoDB,facultiesWithCourseIntoDB,removeFacultiesFromCourseFromDB
}