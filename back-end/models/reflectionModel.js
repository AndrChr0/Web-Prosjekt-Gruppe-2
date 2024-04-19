const mongoose = require("mongoose");

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

module.exports = mongoose.model("Reflection", reflectionSchema);