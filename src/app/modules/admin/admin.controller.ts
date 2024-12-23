
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import {StatusCodes} from 'http-status-codes';
import { AdminServices } from './admin.service';



const getAllAdmins = catchAsync(async (req, res,next) => {
  try {
    const queryField = req.query
    const result = await AdminServices.getAllAdminsFromDB(queryField);
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Admins Retrieved Successfully',
    data:result
   });
  } catch (err) {
    next(err);
  }
});

const getSingleAdmin= catchAsync(async (req, res) => {
  
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);
    sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Admin Retrieved Successfully',
    data:result
   })
});
const updateSingleAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {admin} =req.body
    const result = await AdminServices.updateAdminIntoDB(id,admin);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Admin Updated Successfully',
    data:result
   })
});
const deleteSingleAdmin =catchAsync( async (req, res) => {

    const { id } = req.params;
    const result = await AdminServices.deleteAdminFromDB(id);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Admin Deleted Successfully',
    data:result
   })
});

export const AdminControllers = {
getAllAdmins,
getSingleAdmin,
updateSingleAdmin,
deleteSingleAdmin
};
