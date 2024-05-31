const express = require("express");
const Course = require("../models/courseModel.js");

// Import required modules
const router = express.Router();

// Function to validate course data
function validateCourse(req, res) {
  if (!req.body.title || !req.body.courseCode) {
    return res
      .status(400)
      .json({ message: "Title and course code are required." });
  } else if (req.body.title.length < 3) {
    return res
      .status(400)
      .json({ message: "Title must be at least 3 characters." });
  } else if (req.body.title.length > 100) {
    return res
      .status(400)
      .json({ message: "Title must be at most 100 characters." });
  } else if (req.body.courseCode.length < 4) {
    return res
      .status(400)
      .json({ message: "Course code must be at least 4 characters." });
  } else if (req.body.courseCode.length > 10) {
    return res
      .status(400)
      .json({ message: "Course code must be at most 10 characters." });
  }
}

// Get a specific course from the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ data: course });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get all courses from the database
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const courses = await Course.find({ userId: userId });

    return res.status(200).json({
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Add a new course to the database
router.post("/", async (req, res) => {
  const validationResponse = validateCourse(req, res);
  if (validationResponse) {
    return validationResponse;
  }

  const newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    courseCode: req.body.courseCode,
    userId: req.user.userId,
  });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).send(savedCourse);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while saving the course." });
  }
});

// Update a course
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const validationResponse = validateCourse(req, res);
    if (validationResponse) {
      return validationResponse;
    }

    const result = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res
      .status(200)
      .send({ message: "Course updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Course.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).send({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
