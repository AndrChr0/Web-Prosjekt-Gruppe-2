import express from "express";
import { Reflection } from "../models/reflectionModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.content || !req.body.courseId) {
      return res.status(400).send({
        message: "Send all required fields: title, content, courseId",
      });
    }
    const newReflection = {
      title: req.body.title,
      content: req.body.content,
      courseId: req.body.courseId,
    };

    const reflection = await Reflection.create(newReflection);
    return res.status(201).send(reflection);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route for get all Reflections from database
router.get("/", async (req, res) => {
  try {
    const reflections = await Reflection.find({});

    return res.status(200).json({
      count: reflections.length,
      data: reflections,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route for get one reflection from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reflection = await Reflection.findById(id);
    return res.status(200).json({ reflection });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// route for updating a reflection
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.content || !req.body.courseId) {
      return res.status(400).send({
        message: "Send all required fields: title, content, courseId",
      });
    }

    const { id } = req.params;
    const result = await Reflection.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "reflection not found" });
    }

    return res.status(200).send({ message: "reflection updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// delete a reflection
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Reflection.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "reflection not found" });
    }

    return res.status(200).send({ message: "reflection deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
