import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";



     const findLastStudentId = async()=>{
        const lastStudent = await User.findOne(
            {
                role:'student'
            },
            {
                id:1,
                _id:0
            },

              ).lean()


              return lastStudent?.id?lastStudent?.id:undefined;
            //   return lastStudent?.id?lastStudent?.id.substring(6):undefined;
     }   
    //  }   
    const generateStudentId=async(payload:TAcademicSemester)=>{

        
       let currentId =(0).toString()
        // const currentId =await findStudentId()|| (0).toString()
        const lastStudentId = await findLastStudentId();
        const lastStudentSemesterCode =lastStudentId?.substring(4,6);//01
        const lastStudentSemesterYear =lastStudentId?.substring(0,4)//2030
        const currenSemesterCode = payload.code;
        const currentYear=payload.year;
        if(lastStudentId && lastStudentSemesterCode===currenSemesterCode && lastStudentSemesterYear===currentYear){
            currentId = lastStudentId.substring(6)
        }


        let incrementId = (Number(currentId)+1).toString().padStart(4,'0');
        incrementId = `${payload.year}${payload.code}${incrementId}`
        return incrementId;
      
    }

    export default generateStudentId;