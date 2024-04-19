
const express = require("express");
const mongoose = require("mongoose");
const ReflectionRoute = require("./routes/ReflectionRoute.js");
const courseRoute = require("./routes/courseRoute.js");
const userRoute = require("./routes/userRoute.js");
const reflectionActivityRoute = require("./routes/reflectionActivityRoute.js");
const FeedbackRoute = require("./routes/feedbackRoute.js");
const cors = require("cors");
const {verifyToken} = require("./middlewares/authMiddleware.js");
const dotenv = require("dotenv");

// search to get students from users
const User = require("./models/userModel.js");
const Reflection = require("./models/reflectionModel.js");

dotenv.config();
const PORT = process.env.PORT || 5555;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());


// Middelware for handeling CORS policy
app.use(cors());

app.use("/reflections", verifyToken, ReflectionRoute);
app.use("/courses", verifyToken, courseRoute);
app.use("/users", userRoute);
app.use('/my_courses', courseRoute); // This will handle all routes prefixed with '/my_courses'
app.use("/uploads", express.static("uploads")); // make the uploads folder public

// reflection activities
app.use("/activities", reflectionActivityRoute);

app.use("/feedback", verifyToken, FeedbackRoute);




const handleSearch = async (req, res) => {
  let users;

  if (req.query.role === "student") {
    users = await User.find({ role: "student" });

    if (req.query.courseId) {
      users = users.filter((user) => user.courses.includes(req.query.courseId));


      if (req.query.visibility === "true") {
        const userIds = users.map(user => user._id);
        // find the reflection where the userId is in the userIds array, and visibility is true
        const reflections = await Reflection.find({ userId: { $in: userIds }, visibility: true });

        if (!reflections || reflections.length === 0) {
          return res.status(404).json({ message: "No reflections found for the students" });
        } 

        return res.status(200).json({
          count: reflections.length,
          data: reflections,
        });
      } 
    }
    // find the reflections of the students
  }

  if (!users || users.length === 0) {
    throw new Error("No users found");
  }

  return users;
}

app.get('/search', async (req, res) => {
  try {
    const results = await handleSearch(req, res);
    res.json(results);
  } catch (err) {
    console.error('error searching users:', err);
    res.status(500).json({ message:'Internal server error' });
  }
});


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("app connected to DB");
    app.listen(PORT, () => {
      console.log(`app is lissstening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
