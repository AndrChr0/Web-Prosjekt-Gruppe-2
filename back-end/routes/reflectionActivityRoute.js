import express from "express";
import { ReflectionActivity } from "../models/reflectionActivityModel.js";
const router = express.Router();

// get all reflection activities from db
router.get("/", async (req, res) => {
    try {
        const reflectionActivities = await ReflectionActivity.find({});

        return res.status(200).json({
            count: reflectionActivities.length,
            data: reflectionActivities,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// get a specific reflection activity from db   
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const reflectionActivity = await ReflectionActivity.findById(id);

        if (!reflectionActivity) {
            return res.status(404).json({ message: "Reflection activity not found" });
        }

        return res.status(200).json({ data: reflectionActivity });
    } catch (error) {
        res.status(500).send(error);
    }
});

// add new reflection activity to db
router.post("/", async (req, res) => {

    const newReflectionActivity = new ReflectionActivity({
        title: req.body.title,
        description: req.body.description,
        courseCode: req.body.courseCode,
    });

    try {
        if (!req.body.title) { 
            return res.status(400).json({ message: "Title is required" });
        } else {
            const savedReflectionActivity = await newReflectionActivity.save();
            res.status(201).send(savedReflectionActivity);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// update a reflection activity
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body.title || !req.body.description ) {
            return res.status(400).send({
                message: "Title and description are required",
            });
        }

        const result = await ReflectionActivity.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Reflection activity not found" });
        }

        return res.status(200).send({ message: "Activity updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// delete a reflection activity
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ReflectionActivity.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Reflection activity not found" });
        }

        return res.status(200).send({ message: "Reflection activity deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
