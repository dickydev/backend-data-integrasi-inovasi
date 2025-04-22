import express from "express";
import { addDoctor, listDoctors } from "../controllers/doctorController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, addDoctor);
router.get("/", authenticate, listDoctors);

export default router;
