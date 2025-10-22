import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export { router as UserRouter };
