import express, { response } from "express";
import mongoose from "mongoose";
import ReflectionRoute from "./routes/ReflectionRoute.js";
import courseRoute from "./routes/courseRoute.js";
import userRoute from "./routes/userRoute.js";
import reflectionActivityRoute from "./routes/reflectionActivityRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5555;
const MONGO_URI = process.env.MONGO_URI;

console.log("env var's", PORT, process.env.PORT)

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  // return res.status(234).send("halla brro");
});

// Middelware for handeling CORS policy
app.use(cors());

app.use("/reflections", ReflectionRoute);
app.use("/courses", courseRoute);
app.use("/users", userRoute)

app.use('/uploads', express.static('uploads')); // make the uploads folder public


// reflection activities
app.use("/activities", reflectionActivityRoute);

// custom origins
// app.use(cors(
//     {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: "Content-Type"
// }
//     ))


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("app connected to DB");
    app.listen(PORT, () => {
      console.log(`app is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
