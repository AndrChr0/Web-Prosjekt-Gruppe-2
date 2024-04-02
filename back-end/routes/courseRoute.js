import express from "express";
import { Course } from "../models/courseModel.js";
const router = express.Router();


// get a specific course from db
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

// add new course to db
router.post("/", async (req, res) => {

    const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        courseCode: req.body.courseCode,
        userId: req.user.userId,
    });

    try {
        if (!req.body.title && !req.body.courseCode) { // some validation
            return res.status(400).json({ message: "Title and course code is required" });
        } else {
            const savedCourse = await newCourse.save();
            res.status(201).send(savedCourse);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// update a course
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body.title || !req.body.description || !req.body.courseCode) {
            return res.status(400).send({
                message: "Send all required fields: title, description, courseCode",
            });
        }

        const result = await Course.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).send({ message: "Course updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});



// delete a course
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Course.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "course not found" });
        }

        return res.status(200).send({ message: "course deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;