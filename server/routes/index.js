import { Router } from "express";
import authRouter from "./auth.js"
import taskRouter from "./tasks.js"

const router = Router();

router.use("/api/auth", authRouter)
router.use("/api/tasks", taskRouter)

export default router;