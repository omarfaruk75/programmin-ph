import {RequestHandler} from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';




const createAcademicSemester:RequestHandler = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Semester is Created Successfully',
    data:result
   })
});

const getAcademicSemesters = catchAsync(async (req, res,next) => {
  try {
    const result = await AcademicSemesterServices.getAcademicSemestersFromDB();
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Semesters Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Semesters Retrieved Successfully',
    data:result
   })
});
const patchAcadmicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.
    patchAcademicSemesterFromDB(semesterId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Semesters Updated Successfully',
    data:result
   })
});
const deleteAcademicSemester=catchAsync( async (req, res) => {

    const {semesterId } = req.params;
    const result = await AcademicSemesterServices.deleteAcademicSemestersFromDB(semesterId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Acadmic Semester Deleted Successfully',
    data:result
   })
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  patchAcadmicSemester,
  deleteAcademicSemester
};
