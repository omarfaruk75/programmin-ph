import express from 'express';
import { userControllers } from './user.controller';
import { studentValidation } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import { adminValidation } from '../admin/admin.validation';

const router = express.Router();


router.post('/create-student',validateRequest(studentValidation.creatStudentValidationSchema),
userControllers.createStudent);
router.post('/create-faculty',validateRequest(facultyValidation.creatFacultyValidationSchema),userControllers.createFaculty);
router.post('/create-admin',validateRequest(adminValidation.creatAdminValidationSchema),userControllers.createAdmin);

export const UserRoutes = router;
