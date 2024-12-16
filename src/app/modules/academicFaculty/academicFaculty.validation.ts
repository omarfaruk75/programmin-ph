import { z } from 'zod';



const createAcademicFacultyValidationSchema = z.object({
 body:z.object({
    name:z.string({
      invalid_type_error:'Academic faculty must be a string',
      required_error:'Faculty Name must be required'
    })
 })
})
const updateAcademicFacultyValidationSchema =  z.object({
 body:z.object({
    name:z.string({
          invalid_type_error:'Academic faculty must be a string',
    })
 })
})
export const AcademicFacultyValidation = {
   createAcademicFacultyValidationSchema,
   updateAcademicFacultyValidationSchema
};
