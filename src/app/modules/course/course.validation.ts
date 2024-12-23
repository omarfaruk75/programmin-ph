import z from "zod";
export const PreRequisiteValidationSchema = z.object({
    course :z.string(),
    isDeleted:z.boolean().optional()
})
const createCoureseValidationSchema = z.object({
    body:z.object({
        title:z.string(),
        prefix:z.string().optional(),
        code:z.number(),
        credits:z.number(),
        preRequisiteCourses:z.array(PreRequisiteValidationSchema).optional()
    })
})

export const UpdatePreRequisiteValidationSchema = z.object({
    course :z.string().optional(),
    isDeleted:z.boolean().optional()
})
const updateCoureseValidationSchema = z.object({
    body:z.object({
        title:z.string().optional(),
        prefix:z.string().optional(),
        code:z.number().optional(),
        credits:z.number().optional(),
        preRequisiteCourses:z.array(UpdatePreRequisiteValidationSchema).optional()
    })
})

export const facultiesWithCoursesValidationSchema =z.object({
    body:z.object({
  faculties:z.array(z.string())
})

})

export const CourseValidation = {
    createCoureseValidationSchema,
    updateCoureseValidationSchema,
    facultiesWithCoursesValidationSchema
}