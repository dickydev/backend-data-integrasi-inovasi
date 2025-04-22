import express from "express";
import {
  addDoctorSchedule,
  getDoctorSchedules,
} from "../controllers/scheduleController.js";

const router = express.Router();

router.post("/doctor/schedule", addDoctorSchedule);
router.get("/doctor/:doctorId/schedules", getDoctorSchedules);

export default router;
