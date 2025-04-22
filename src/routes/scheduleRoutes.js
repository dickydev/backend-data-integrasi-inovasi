import express from "express";
import {
  addDoctorSchedule,
  getDoctorSchedules,
} from "../controllers/scheduleController.js";

const router = express.Router();

router.post("/", addDoctorSchedule);
router.get("/:doctorId/", getDoctorSchedules);

export default router;
