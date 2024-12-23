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
    
     const findLastFacultyId = async()=>{
        const lastFaculty = await User.findOne(
            {
                role:'faculty'
            },
            {
                id:1,
                _id:0
            },)
            .sort({
                    createdAt: -1,
     }).lean()


               return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;

     }  
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};
 
    export const generateStudentId=async(payload:TAcademicSemester)=>{
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
    export const generateFacultyId=async()=>{

     let currentId =(0).toString()
        // const currentId =await findStudentId()|| (0).toString()
        
        const lastFcultyId = await findLastFacultyId();
          if (lastFcultyId) {
        currentId = lastFcultyId.substring(2);
  }
        let incrementId = (Number(currentId)+1).toString().padStart(4,'0');

        incrementId = `F-${incrementId}`;

       return incrementId;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};

   