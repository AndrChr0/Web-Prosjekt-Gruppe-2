import mongoose from "mongoose";

const reflectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    //   courseId: {
    //   type: String,
    //   required: true,
    // }, 
    // courseCode: {
    //   type: String,
    //   required: true,
    // },
    visibility: {
      type: Boolean,
      default: false,
    },
    files: [String],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the User model
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: false
    },
  },

  {
    timestamps: true,
  }
);

export const Reflection = mongoose.model("Reflection", reflectionSchema);
