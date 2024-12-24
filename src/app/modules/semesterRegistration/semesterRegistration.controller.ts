import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { SemesterRegistrationServices } from "./semesterRegistration.service";
import sendResponse from "../../utils/sendResponse";
import {StatusCodes} from "http-status-codes"

const createSemesterRegistration:RequestHandler = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Academic Semester is Created Successfully',
    data:result
   })
});
const getSemesterRegistrations = catchAsync(async (req, res,next) => {
  try {

    const result = await SemesterRegistrationServices.getSemesterRegistrationsFromDB(req.query);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Semester Registration Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Semester Registration Retrieved Successfully',
    data:result
   })
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.updateSemesterRegistrationFromDB(id,req.body);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Semester Registration Updated Successfully',
    data:result
   })
});
export const SemesterRegistrationController = {
    createSemesterRegistration,getSemesterRegistrations,getSingleSemesterRegistration,updateSemesterRegistration
}