import { Router } from "express";
import controller from "./controller";
import authenticate from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.use(authenticate);

router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);

router.use(authorize("admin"));

router.post("/", controller.createUser);
router.post("/buy/courses", controller.purchaseCourse); // not tested
router.put("/:id", controller.updateUser);
router.patch("/watch-later", controller.handleWatchLater);
router.patch("/cart", controller.handleCart);
router.delete("/:id", controller.deleteUser);

export { router as UserRouter };
