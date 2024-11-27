import { z } from 'zod';

const userValidationSchema = z.object({
  Password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password should not be more than 20' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};