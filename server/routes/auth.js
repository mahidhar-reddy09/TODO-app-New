import express from "express";
import { register, login, logout, refreshToken } from '../controllers/auth.js';
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

export default router;
