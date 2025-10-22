import express, { Application, Request, Response } from "express";
import coursesRouter from "./courses/router";
import dbConnect from "../db/db";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/api/v1/courses", coursesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
