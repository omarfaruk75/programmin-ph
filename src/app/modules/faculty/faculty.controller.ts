
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import {StatusCodes} from 'http-status-codes';
import { FacultyServices } from './faculty.service';


const getAllFaculties = catchAsync(async (req, res,next) => {
  try {
    const queryField = req.query
    const result = await FacultyServices.getAllFacultiesFromDB(queryField);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Faculties Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleFaculty = catchAsync(async (req, res) => {
  
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Faculty Retrieved Successfully',
    data:result
   })
});
const updateSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {faculty} =req.body
    const result = await FacultyServices.updateFacultyIntoDB(id,faculty);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Faculty Updated Successfully',
    data:result
   })
});
const deleteSingleFaculty =catchAsync( async (req, res) => {

    const { id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Faculty Deleted Successfully',
    data:result
   })
});

export const FacultyControllers = {
getAllFaculties,
getSingleFaculty,
updateSingleFaculty,
deleteSingleFaculty,

};
