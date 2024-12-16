import { z } from 'zod';

// User Name Schema
const userNameValidationSchema = z.object({
  firstName: z.string().max(20, 'First name should not exceed 20 characters.'),
  middleName: z.string().optional(),
  lastName: z.string().max(20, 'First name should not exceed 20 characters.'),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name should not below 1 character.'),
  motherName: z.string().min(1, 'Mother Name should not below 1 character.'),
  fatherOccupation: z
    .string()
    .min(1, "Father's occupation Name should not below 1 character."),
  motherOccupation: z
    .string()
    .min(1, "Mother's occupation Name should not below 1 character."),
  fatherContactNo: z.string().min(1),
  motherContactNo: z.string().min(1),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Student Schema
const   creatStudentValidationSchema = z.object({
  body:z.object({
  password: z.string().min(1),
  student:z.object({
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Please provide a valid email address.').trim(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  academicDepartment:z.string().optional(),
  admissionSemester:z.string().optional(),
  isDeleted:z.boolean().optional(),
  profileImg: z.string().optional(),
 })
})
})
//update student validation
const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(), // Optional for updates
    student: z
      .object({
        name: userNameValidationSchema.partial(), // Make all fields in the name schema optional
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
        guardian: guardianValidationSchema.partial(), // Make all fields in the guardian schema optional
        localGuardian: localGuardianValidationSchema.partial(), // Make all fields in the local guardian schema optional
        academicDepartment: z.string().optional(),
        admissionSemester: z.string().optional(),
        isDeleted: z.boolean().optional(),
        profileImg: z.string().optional(),
      })
      .partial(), // Make all fields in the student schema optional
  }),
});

// Export Zod Schema
export const studentValidation = {
  creatStudentValidationSchema,
  updateStudentValidationSchema
};
