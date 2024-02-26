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
    courseId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reflection = mongoose.model("Reflection", reflectionSchema);