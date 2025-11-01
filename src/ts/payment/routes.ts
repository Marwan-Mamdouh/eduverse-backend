import { Router } from "express";
import controller from "./controller";
import authenticate from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.use(authenticate);
router.use(authorize("user"));

router.post("/check-out", controller.createOrder);

export default router;
