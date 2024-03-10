import mongoose from "mongoose";

const reflectionActivitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReflectionActivity = mongoose.model("reflection-activities", reflectionActivitySchema);