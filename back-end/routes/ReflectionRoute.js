import { verifyToken } from '../middlewares/authMiddleware.js';
import express from "express";
import { Reflection } from "../models/reflectionModel.js";
import multer from "multer";
const router = express.Router();

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

// Route for handling POST requests to create a new reflection
router.post("/", upload.array("files", 5), async (req, res) => {
  try {
    // Check if all required fields are provided
    if (!req.body.title || !req.body.content || !req.body.courseId) {
      return res.status(400).send({
        message: "Send all required fields: title, content, courseId",
      });
    }
    // Map paths of files
    const filesPaths = req.files.map((file) => file.path);

    // Create new reflection object
    const newReflection = {
      title: req.body.title,
      content: req.body.content,
      courseId: req.body.courseId,
      visibility: req.body.visibility,
      files: filesPaths,
      userId: req.user.userId,
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
router.get("/", async (req, res) => {
  try {
    // Retrieve all reflections from the database
    const userId = req.user.userId;
    const reflections = await Reflection.find({ userId: userId });

    return res.status(200).json({
      count: reflections.length,
      data: reflections,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

/* 
// GET request for a single reflection, verifying ownership
router.get("/:id", verifyToken, async (req, res) => {
  try {
    // Corrected to use req.params.id to get the reflection ID from the URL
    const reflection = await Reflection.findById(req.params.id);
    if (!reflection) {
      return res.status(404).json({ message: "Reflection not found" });
    }
    // Now correctly checks if the logged-in user's ID matches the studentId in the reflection
    // Make sure to convert both to strings for a proper comparison, as one might be an ObjectId
    if (reflection.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json(reflection);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

*/

// Route for handling GET requests to retrieve a single reflection by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Retrieve a reflection by its ID from the database
    const reflection = await Reflection.findById(id);
    return res.status(200).json({ reflection });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route for handling PUT requests to update a reflection by ID
router.put("/:id", async (req, res) => {
  try {
    // Check if all required fields are provided
    if (!req.body.title || !req.body.content || !req.body.courseId) {
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
router.delete("/:id", async (req, res) => {
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

export default router;
