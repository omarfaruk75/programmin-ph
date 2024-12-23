import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';



const router = express.Router();
router.post('/create-course',
    validateRequest(CourseValidation.createCoureseValidationSchema),
    CourseControllers.createCourse);
router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.put('/:courseId/assign-faculties',validateRequest(CourseValidation.facultiesWithCoursesValidationSchema),CourseControllers.assignFaculties);
router.delete('/:courseId/remove-faculties',validateRequest(CourseValidation.facultiesWithCoursesValidationSchema),CourseControllers.removeFacultiesFromCourse);
router.patch('/:id',validateRequest(CourseValidation.updateCoureseValidationSchema),
CourseControllers.updateCourse);
router.delete('/:id',CourseControllers.deleteCourse)

export const CourseRoutes = router;
