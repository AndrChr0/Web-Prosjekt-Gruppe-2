import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true
    },
    lastName: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    reflections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reflection",
      },
    ]
  },
  {
    timestamps: true,
  }
);

// Hashes the password before saving the user model.. funker ikke enda. Nej ikke med den instillingen se her
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    //Generate a salt
    const salt = await bcrypt.genSalt(10);
    //Hash pass
    this.password = await bcrypt.hash(this.password, salt);
    //Continue with next middleware
    next();
  } catch (error) {
    return next(error);
  }
});
export const User = mongoose.model("User", userSchema);
