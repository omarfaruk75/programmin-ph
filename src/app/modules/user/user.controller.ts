import {RequestHandler} from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../utils/catchAsync';



const createStudent:RequestHandler = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudentIntoDB(password, studentData);
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student Create Successfully',
    data:result
   })
});
const createFaculty:RequestHandler = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
    const result = await userService.createFacultyIntoDB(password, facultyData);
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Faculty Create Successfully',
    data:result
   })
});
const createAdmin:RequestHandler = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;
    const result = await userService.createAdminIntoDB(password, adminData);
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Admin Create Successfully',
    data:result
   })
});
export const userControllers = {
  createStudent,createFaculty,createAdmin
};
