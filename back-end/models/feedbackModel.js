import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
{
    content: {
        type: String,
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reflectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reflection'
    },
},
{
  timestamps: true,
});



export const Feedback = mongoose.model("Feedback", feedbackSchema, 'feedback');