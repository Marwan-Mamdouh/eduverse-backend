import { Router } from "express";
import coursesController from "./controller";

const router = Router();

router.get("/:id", coursesController.getCourseById);
router.get("/", coursesController.getAllCourse);

router.post("/", coursesController.addCoures);
router.put("/:id", coursesController.updateCourseById);
router.delete("/:id", coursesController.deleteCourseById);

export default router;
