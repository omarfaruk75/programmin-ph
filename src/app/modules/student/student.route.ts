import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch('/:studentId',validateRequest(studentValidation.updateStudentValidationSchema), StudentControllers.updateSingleStudent);
router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
