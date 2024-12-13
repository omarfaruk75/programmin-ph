import {RequestHandler} from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';





const createAcademicFaculty:RequestHandler = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Faculty is Created Successfully',
    data:result
   })
});

const getAcademicFaculties = catchAsync(async (req, res,next) => {
  try {
    const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Faculties Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Faculty Retrieved Successfully',
    data:result
   })
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(facultyId,req.body);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Faculty Updated Successfully',
    data:result
   })
});


export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
