import express from "express";
import controller from "./controller";
import authenticate from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

router.use(authenticate);
router.use(authorize("user"));

router.post("/check-out", controller.createOrder);
router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  controller.stripeWebhook
);

export default router;
