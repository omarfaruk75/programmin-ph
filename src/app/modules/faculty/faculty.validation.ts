import { z } from 'zod';

// Faculty Name Schema
const facultyNameValidationSchema = z.object({
  firstName: z.string().max(20, 'First name should not exceed 20 characters.'),
  middleName: z.string().optional(),
  lastName: z.string().max(20, 'First name should not exceed 20 characters.'),
});

// Update Faculty Name Schema
const updateFacultyNameValidationSchema = z.object({
  firstName: z.string().max(20, 'First name should not exceed 20 characters.').optional(),
  middleName: z.string().optional(),
  lastName: z.string().max(20, 'First name should not exceed 20 characters.').optional(),
});


// Student Schema
const   creatFacultyValidationSchema = z.object({
  body:z.object({
  password: z.string().min(1),
  faculty:z.object({
  role:z.string(),
  designation:z.string(),
  name: facultyNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Please provide a valid email address.').trim(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  academicDepartment:z.string().optional(),
  academicFaculty:z.string().optional(),
  isDeleted:z.boolean().optional(),
  profileImg: z.string().optional(),
 })
})
})
//update student validation
const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(), // Optional for updates
    faculty: z
      .object({
        name: updateFacultyNameValidationSchema, // Make all fields in the name schema optional
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email('Please provide a valid email address.').trim().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        academicDepartment: z.string().optional(),
        academicFaculty: z.string().optional(),
        isDeleted: z.boolean().optional(),
        profileImg: z.string().optional(),
      })
  }),
});

// Export Zod Schema
export const facultyValidation = {
  creatFacultyValidationSchema,
  updateFacultyValidationSchema
};
