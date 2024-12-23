import {RequestHandler} from 'express';
import sendResponse from '../../utils/sendResponse';
import {StatusCodes} from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';


const createCourse:RequestHandler = catchAsync(async (req, res) => {
    const result = await CourseServices.createCoureseIntoDB(req.body)
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Course is Created Successfully',
    data:result
   })
});

const getAllCourses = catchAsync(async (req, res,next) => {
  try {
    const queryField =req.params
    const result = await CourseServices.getAllCoursesFromDB(queryField);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Courses Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleCourse = catchAsync(async (req, res) => {
    const {id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Course Retrieved Successfully',
    data:result
   })
});
const updateCourse = catchAsync(async (req, res) => {
    const {id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id,req.body);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Course Retrieved Successfully',
    data:result
   })
});
const assignFaculties = catchAsync(async (req, res) => {
    const {courseId } = req.params;
    const {faculties}=req.body;
    const result = await CourseServices.facultiesWithCourseIntoDB(courseId,faculties);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Course Faculty  Successfully assigned',
    data:result
   })
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const {courseId } = req.params;
    const {faculties}=req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(courseId,faculties);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:' Faculty remove Successfully',
    data:result
   })
});
const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Course is Deleted Successfully',
    data:result
   })
});


export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
  removeFacultiesFromCourse
};
