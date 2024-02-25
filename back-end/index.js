import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import BookRoute from "./routes/BooksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("halla brro");
});
app.use(cors());

app.use("/books", BookRoute);

// Middelware for handeling CORS policy
// const cors = require("cors");

// custom origins
// app.use(cors(
//     {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: "Content-Type"
// }
//     ))

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to DB");
    app.listen(PORT, () => {
      // Change the port number to a different value, e.g., 5556
      console.log(`app is listening on 5556`); // Update the console log message accordingly
    });
  })
  .catch((error) => {
    console.log(error);
  });
