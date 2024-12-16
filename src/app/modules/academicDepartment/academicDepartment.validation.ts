import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
 body:z.object({
   name:z.string({
      invalid_type_error:'Academic Department must be a string',
      required_error:'Department Name must be required'
    }),
    academicFaculty:z.string({
      invalid_type_error:'Academic Faculty must be a string',
      required_error:'Faculty must be required'
    })
 })
})
const updateAcademicDepartmentValidationSchema =  z.object({
 body:z.object({
 name:z.string({
      invalid_type_error:'Academic Departmet updated Successfully',
      required_error:'Department Name must be required'
    }).optional(),
 academicFaculty:z.string({
      invalid_type_error:'Academic Faculty must be a string',
      required_error:'Faculty must be required'
    }).optional()
 })
})
export const AcademicDepartmentValidation = {
   createAcademicDepartmentValidationSchema,
   updateAcademicDepartmentValidationSchema
};
