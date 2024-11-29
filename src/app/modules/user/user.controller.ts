import { Request, Response } from 'express';
import { userService } from './user.service';
// import studentValidationSchema from "../student/student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {

    const { password, student: studentData } = req.body;
    // console.log({password,studentData});
    // const zodParseData = studentValidationSchema.parse(userData)
    const result = await userService.createStudentIntoDB(password, studentData);
    

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  createStudent,
};
