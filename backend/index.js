import express from "express";
// import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import todosRoute from "./routes/todosRoute.js";
import cors from "cors";
import "dotenv/config";

const app = express();

// Middleware for parsing req body
app.use(express.json());

// Middleware for handle CORS policy
// 1) Allow all Origins
app.use(cors());

// 2) Customs Origins
// app.use(
//   cors({
//     origin: "http://localhost:8000",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(222).send("MERN TO-DO-LIST");
});

app.use("/todos", todosRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
