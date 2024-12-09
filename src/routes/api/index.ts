import { Router } from "express";
import { thoughtRouter } from "./thoughtRoutes";
import { userRouter } from "./userRoutes";

const router = Router();

router.use("/thoughts", thoughtRouter);
router.use("/users", userRouter);

export default router;
