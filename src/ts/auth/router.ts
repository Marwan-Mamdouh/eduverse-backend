import { Router } from "express";
import controller from "./controller";
import authenticate from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);
router.post("/refresh-token", controller.refreshToken);
router.post(
  "/logout",
  authenticate,
  authorize("user", "admin"),
  controller.logout
);

export default router;
