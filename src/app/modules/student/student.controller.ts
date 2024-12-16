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
  
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student Retrieved Successfully',
    data:result
   })
});
const updateSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const {student} =req.body
    const result = await StudentServices.updateStudentIntoDB(studentId,student);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student Updated Successfully',
    data:result
   })
});
const deleteSingleStudent =catchAsync( async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
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
