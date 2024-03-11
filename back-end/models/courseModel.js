import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
{
    title: { 
        type: String, 
        required: true 
    },
    description: {
        type: String
    },
    courseCode: { //IDG2001 f.ex
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
{
  timestamps: true,
});



export const Course = mongoose.model("Course", courseSchema);