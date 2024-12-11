import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res,next) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
   sendResponse(res,{
    statusCode:httpStatus.OK,
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
    statusCode:httpStatus.OK,
    success:true,
    message:'Student Retrieved Successfully',
    data:result
   })
});
const putSingleStudent = catchAsync(async (req, res) => {
  
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student Updated Successfully',
    data:result
   })
});
const deleteSingleStudent =catchAsync( async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student Deleted Successfully',
    data:result
   })
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  putSingleStudent,
  deleteSingleStudent,

};
