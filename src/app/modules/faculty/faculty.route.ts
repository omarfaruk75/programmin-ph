import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { facultyValidation } from './faculty.validation';


const router = express.Router();
router.get('/', FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.patch('/:id',validateRequest(facultyValidation.updateFacultyValidationSchema), FacultyControllers.updateSingleFaculty);
router.delete('/:id', FacultyControllers.deleteSingleFaculty);

export const FacultyRoutes = router;
