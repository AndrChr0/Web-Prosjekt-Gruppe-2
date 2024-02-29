import express from "express";
import { Course } from "../models/courseModel.js";
const router = express.Router();

// get all courses from db
router.get("/", async (req, res) => {
        try {
            const courses = await Course.find({});
    
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
    });

    try {
        if (!req.body.title && !req.body.courseCode) { // some validation
            return res.status(400).json({ message: "Title and course code is required" });
        } else {
            const savedCourse = await newCourse.save();
            res.status(201).send(savedCourse);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});



export default router;