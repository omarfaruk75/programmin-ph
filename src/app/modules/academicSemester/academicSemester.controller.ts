import {RequestHandler} from 'express';
import sendResponse from '../../utils/sendResponse';
import {StatusCodes} from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';




const createAcademicSemester:RequestHandler = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Semester is Created Successfully',
    data:result
   })
});

const getAcademicSemesters = catchAsync(async (req, res,next) => {
  try {
    const queryField = req.query
    const result = await AcademicSemesterServices.getAcademicSemestersFromDB(queryField);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Semesters Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Semesters Retrieved Successfully',
    data:result
   })
});
const updateAcadmicSemester = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(id,req.body);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Semesters Updated Successfully',
    data:result
   })
});


export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcadmicSemester,
};
