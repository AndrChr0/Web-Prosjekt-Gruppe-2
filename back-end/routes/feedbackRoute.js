import express from "express";
import { Feedback } from "../models/feedbackModel.js";
const router = express.Router();

// get a specific feedback from db
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        return res.status(200).json({ data: feedback });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// get all feedback from db
router.get("/", async (req, res) => {
  const { reflectionId } = req.query;
    try {
        const feedback = await Feedback.find({ reflectionId: reflectionId });

        return res.status(200).json({
            count: feedback.length,
            data: feedback,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});




//make new feedback
router.post("/", async (req, res) => {
  const userId = req.user.userId;
  const reflectionId = req.body.reflectionId;

  try {
      // check if the user has already submitted feedback for this reflection
      const existingFeedback = await Feedback.findOne({ reflectionId, userId });

      if (existingFeedback) {
          // update the existing feedback if it exists
          existingFeedback.content = req.body.content;
          const updatedFeedback = await existingFeedback.save();
          res.status(200).send(updatedFeedback);
      } else {
          // create a new entry if a feedback doesnt exist
          const newFeedback = new Feedback({
              content: req.body.content,
              reflectionId: req.body.reflectionId,
              userId: req.user.userId,
          });
          const savedFeedback = await newFeedback.save();
          res.status(201).send(savedFeedback);
      }
  } catch (error) {
      res.status(500).send(error);
  }
});

// update feedback
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ feedback: updatedFeedback });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// delete feedback
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFeedback = await Feedback.findByIdAndDelete(id);
      if (deletedFeedback) {
        return res.status(200).json({ message: "Feedback deleted" });
      } else {
        return res.status(404).json({ message: "Feedback not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });


export default router;