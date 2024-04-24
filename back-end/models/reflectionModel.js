const mongoose = require("mongoose");

const reflectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 15000,
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