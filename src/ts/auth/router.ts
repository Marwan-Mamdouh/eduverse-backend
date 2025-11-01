import { Router } from "express";
import controller from "./controller";
import authenticate from "../middlewares/auth";

const router = Router();

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);
router.post("/refresh-token", controller.refreshToken);
router.post("/with-google", controller.signInWithGoogle);
router.post("/logout", authenticate, controller.logout);

export default router;
