import { Router } from "express";
import controller from "./controller";
import authenticate from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.get("/", controller.getAllCourse);
router.get("/:id", controller.getCourseById);

router.use(authenticate);
router.use(authorize("user", "admin"));

router.post("/", controller.addCourse);
router.put("/:id", controller.updateCourseById);
router.patch("/review", controller.addReview);
router.delete("/:id", controller.deleteCourseById);

export default router;
