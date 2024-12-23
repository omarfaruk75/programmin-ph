import {RequestHandler} from 'express';
import sendResponse from '../../utils/sendResponse';
import {StatusCodes} from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment:RequestHandler = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Department is Created Successfully',
    data:result
   })
});

const getAcademicDepartments = catchAsync(async (req, res,next) => {
  try {
    const queryField =req.query
    const result = await AcademicDepartmentServices.getAcademicDepartmentsFromDB(queryField);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Departments Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Department Retrieved Successfully',
    data:result
   })
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentFromDB(departmentId,req.body);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Department Updated Successfully',
    data:result
   })
});


export const AcademicDepartmentControllers = {
createAcademicDepartment,
 getAcademicDepartments,
getSingleAcademicDepartment,
updateAcademicDepartment,
};
