import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";



     const findStudentId = async()=>{
        const lastStudent = await User.findOne(
            {
                role:'student'
            },
            {
                id:1,
                _id:0
            },

              ).lean()
              return lastStudent?.id?lastStudent?.id.substring(6):undefined;
     }   
    const generateStudentId=async(payload:TAcademicSemester)=>{
        const currentId =await findStudentId()|| (0).toString()
        let incrementId = (Number(currentId)+1).toString().padStart(4,'0');
        incrementId = `${payload.year}${payload.code}${incrementId}`
        return incrementId;
      
    }

    export default generateStudentId;