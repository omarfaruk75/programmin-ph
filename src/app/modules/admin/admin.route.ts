import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminControllers } from './admin.controller';
import { adminValidation } from './admin.validation';



const router = express.Router();
router.get('/', AdminControllers.getAllAdmins);
router.get('/:id', AdminControllers.getSingleAdmin);
router.patch('/:id',validateRequest(adminValidation.updateAdminValidationSchema), AdminControllers.updateSingleAdmin);
router.delete('/:id', AdminControllers.deleteSingleAdmin);

export const AdminRoutes = router;
