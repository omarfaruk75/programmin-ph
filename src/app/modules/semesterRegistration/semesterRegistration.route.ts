import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();
router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id',validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema),SemesterRegistrationController.updateSemesterRegistration);
router.get('/',SemesterRegistrationController.getSemesterRegistrations);
router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema),SemesterRegistrationController.createSemesterRegistration);
 export const SemesterRegistrationRoutes = router;
