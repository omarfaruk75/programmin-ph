import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";
const preRequisiteCoursesSchem = new Schema<TPreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
        ref:'Course'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
const courseSchema =new Schema<TCourse>({
    title:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    prefix:{
        type:String,
        trim:true,
        required:true,
    },
    code:{
        type:Number,
        trim:true,
        required:true,
    },
    credits:{
        type:Number,
        trim:true,
        required:true,
    },
      isDeleted:{
        type:Boolean,
        default:false
    },
    preRequisiteCourses:[preRequisiteCoursesSchem]
})

const courseFacultySchema =  new Schema<TCourseFaculty>({

    course:{
        type:Schema.Types.ObjectId,
        ref:'Course',
        unique:true
    },
    faculties:[
        {
        type:Schema.Types.ObjectId,
        ref:'Faculty'
    }
]
})
export const CourseFaculty =model<TCourseFaculty>('CourseFaculty',courseFacultySchema)
export const Course = model<TCourse>('Course',courseSchema);