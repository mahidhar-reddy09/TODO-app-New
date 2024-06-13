import express from "express";
import { getTasks, createTask, updateTask, deleteTask, getCurrentTasks } from "../controllers/tasks.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, getTasks);
router.post("/", verifyJWT, createTask);
router.put("/:id", verifyJWT, updateTask);
router.delete("/:id", verifyJWT, deleteTask);
router.get("/current/:id", verifyJWT, getCurrentTasks)

export default router;
