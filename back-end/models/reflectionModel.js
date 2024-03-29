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
    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },

  {
    timestamps: true,
  }
);

export const Reflection = mongoose.model("Reflection", reflectionSchema);
