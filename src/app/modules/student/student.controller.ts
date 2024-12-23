import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import {StatusCodes} from 'http-status-codes';


const getAllStudents = catchAsync(async (req, res,next) => {
  try {
    const queryField = req.query
    const result = await StudentServices.getAllStudentsFromDB(queryField);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleStudent = catchAsync(async (req, res) => {
  
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student Retrieved Successfully',
    data:result
   })
});
const updateSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {student} =req.body
    const result = await StudentServices.updateStudentIntoDB(id,student);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student Updated Successfully',
    data:result
   })
});
const deleteSingleStudent =catchAsync( async (req, res) => {

    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student Deleted Successfully',
    data:result
   })
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,

};
