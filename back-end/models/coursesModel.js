import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    teacherId: {
      type: ObjectId,
      required: true
    },
    studentId: {
        type: Number,
        required: true,
      },
    createdAt: {
        type: Date,
        "default": Date.now
    },
    updatedAt: {
        type: Date,
        "default": Date.now
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);