
const express = require("express");
const Reflection = require("../models/reflectionModel.js");
const Course = require("../models/courseModel.js");
const multer = require("multer");
const router = express.Router();
const {verifyToken ,requireRole} = require("../middlewares/authMiddleware.js");


// Multer configuration for file upload functionality
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set upload destination folder
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // Get current date and time
    const now = new Date();
    // Format the date and time
    const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS, replace colons with dashes
    // Combine date, time, and original filename
    const dateTimePrefix = `${date}_${time}`; // Date-time prefix
    const originalFileName = file.originalname.replace(/\s/g, "_"); // Replace spaces in original filename with underscores to avoid issues
    const filename = `${dateTimePrefix}-${originalFileName}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // 2MB
  },
  fileFilter: (req, file, cb) => {

    console.log("Mimetype:", file.mimetype);
    // Check file mimetype for allowed file types
    if (
      file.mimetype.startsWith("application/pdf") ||
      file.mimetype.startsWith("application/gzip") ||
      file.mimetype.startsWith("application/zip") ||
      file.mimetype.startsWith("application/x-zip-compressed") ||
      file.mimetype.startsWith("image/jpeg") ||
      file.mimetype.startsWith("image/png") ||
      file.mimetype.startsWith("video/mp4")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only .pdf, .gz, .zip .jpg, .png and .mp4 files are allowed"),
        false
      );
    }
  },
});



router.get("/search", /* requireRole(["student", "teacher"]), */ async (req, res) => {
  try {
    const visibility = Boolean(req.query.visibility);
    let reflections;

    if (visibility) { 
      
      // finding the courses of the teacher
      const teacherId = req.user.userId; 
      const courses = await Course.find({ userId: teacherId });

      // getting the courseIds from the courses
      const courseIds = courses.map(course => course._id);

      // matching the courseIds with the reflections' courseIds
      reflections = await Reflection.find({ visibility: true, courseId: { $in: courseIds } })
      .populate('courseId', 'title')
      .populate('userId', 'firstName lastName');

      return res.status(200).json({
        count: reflections.length,
        data: reflections,
      });
    } else {
      return res.status(200).json({ message: 'No data found with visibility true' }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route for handling POST requests to create a new reflection
router.post("/", upload.array("files", 5)/* , verifyToken ,requireRole(["student"]) */, async (req, res) => {

  try {
    // Check if all required fields are provided
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({
        message: "Send all required fields: title, content",
      });
    } else if(req.body.title.length < 3 || req.body.title.length > 100) {
      return res.status(400).send({
        message: "Title must be between 3 and 100 characters",
      });
    } else if(req.body.content.length < 10 || req.body.content.length > 15000) {
      return res.status(400).send({
        message: "Content must be between 10 and 15000 characters",
      });
    }
    // Map paths of files
    const filesPaths = req.files.map((file) => file.path);

    // Create new reflection object
    const newReflection = {
      title: req.body.title,
      content: req.body.content,
      visibility: req.body.visibility,
      files: filesPaths,
      userId: req.user.userId,
      courseId: req.body.courseId,
    };

    // Save the new reflection to the database
    const reflection = await Reflection.create(newReflection);
    return res.status(201).send(reflection);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for handling GET requests to retrieve all reflections from the database
router.get("/", /* requireRole(["student", "teacher"]) */ async (req, res) => {
  try {
    // Retrieve all reflections from the database
    const userId = req.user.userId;
    const reflections = await Reflection.find({ userId: userId });

    if (!reflections.length) {
      return res.status(404).json({ message: "No reflections found" });
    }

    return res.status(200).json({
      count: reflections.length,
      data: reflections,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route for handling GET requests to retrieve a single reflection by ID
router.get("/:id", /* requireRole(["student", "teacher"]), */ async (req, res) => {
  try {
    const { id } = req.params;
    // Retrieve a reflection by its ID from the database
    const reflection = await Reflection.findById(id)
    .populate('userId', 'firstName lastName') // in case if we want to show student's name on their reflection
    .populate('courseId', 'title courseCode');
    if (req.user.role === "teacher") {
      
      return res.status(200).json({ reflection });
    }

    // Check if the reflection belongs to the logged-in user
    if (!reflection) {
      return res.status(404).json({ message: "Reflection not found" });
    }
    if (reflection.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    return res.status(200).json({ reflection });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});



// Route for handling PUT requests to update a reflection by ID
router.put("/:id",  /* requireRole("student"), */ async (req, res) => {
  try {
    // Check if all required fields are provided
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({
        message: "Send all required fields: title, content, courseId",
      });
    }

    const { id } = req.params;
    // Update a reflection by its ID in the database
    const result = await Reflection.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Reflection not found" });
    }

    return res.status(200).send({ message: "Reflection updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for handling DELETE requests to delete a reflection by ID
router.delete("/:id", /* requireRole("student") */ async (req, res) => {
  try {
    const { id } = req.params;
    // Delete a reflection by its ID from the database
    const result = await Reflection.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Reflection not found" });
    }

    return res.status(200).send({ message: "Reflection deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;