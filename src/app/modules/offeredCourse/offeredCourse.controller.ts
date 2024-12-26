import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {StatusCodes} from "http-status-codes";
import { OfferedCourseServices } from "./offeredCourse.service";


const createOfferedCourse:RequestHandler = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCoureseIntoDB (req.body)
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Offered Course is Created Successfully',
    data:result
   })
});

const getAllOfferedCourses = catchAsync(async (req, res,next) => {
  try {
    const queryField =req.params
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(queryField);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Offered Courses Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const {id } = req.params;
    const result = await OfferedCourseServices.getSingleOfferedCoursesFromDB(id);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Offered Course Retrieved Successfully',
    data:result
   })
});
// const updateCourse = catchAsync(async (req, res) => {
//     const {id } = req.params;
//     const result = await CourseServices.updateCourseIntoDB(id,req.body);
//     sendResponse(res,{
//     statusCode:StatusCodes.OK,
//     success:true,
//     message:'Course Retrieved Successfully',
//     data:result
//    })
// });

// const deleteCourse = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await CourseServices.deleteCourseFromDB(id);
//   sendResponse(res,{
//     statusCode:StatusCodes.OK,
//     success:true,
//     message:'Course is Deleted Successfully',
//     data:result
//    })
// });

export const OfferedCourseControllers = {
  createOfferedCourse,getAllOfferedCourses,getSingleOfferedCourse
 
};