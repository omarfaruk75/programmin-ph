import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);
router.get('/:studentId', StudentControllers.putSingleStudent);
router.get('/:studentId', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
