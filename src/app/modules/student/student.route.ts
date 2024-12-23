import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch('/:id',validateRequest(studentValidation.updateStudentValidationSchema), StudentControllers.updateSingleStudent);
router.delete('/:id', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
