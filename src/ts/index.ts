import express, { Application } from "express";
import cors from "cors";
import { loggerMiddleware } from "./middlewares/logger";
import coursesRouter from "./courses/router";
import { UserRouter } from "./user/router";
import authRouter from "./auth/router";
import paymentRouter from "./payment/router";
import dbConnect from "./db/db";
import { errorHandler } from "./middlewares/errorHandler";
import "dotenv";

process.loadEnvFile(".env");

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

dbConnect();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", UserRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/payment", paymentRouter);

// Error Handling Middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
