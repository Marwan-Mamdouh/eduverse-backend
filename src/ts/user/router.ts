import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.get("/watch-later/:id", controller.getWatchLater);

router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.patch("/watch-later", controller.handleWatchLater);
router.delete("/:id", controller.deleteUser);

export { router as UserRouter };
