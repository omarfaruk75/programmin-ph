import express from 'express';
import { userController } from './user.controller';
import { studentValidation } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();


router.post('/create-student',validateRequest(studentValidation.creatStudentValidationSchema),
userController.createStudent)

export const UserRoutes = router;
