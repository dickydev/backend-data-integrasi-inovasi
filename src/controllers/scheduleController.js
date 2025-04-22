import {
  createSchedule,
  getDoctorSchedulesById,
} from "../models/scheduleModel.js";
import { getDoctorById } from "../models/doctorModel.js";
import moment from "moment";

export const addDoctorSchedule = async (req, res) => {
  const {
    doctor_id,
    day,
    time_start,
    time_finish,
    quota,
    status,
    schedule_date,
  } = req.body;

  try {
    const doctor = await getDoctorById(doctor_id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const [startDateStr, endDateStr] = schedule_date.split(" s/d ");
    const start = moment(startDateStr);
    const end = moment(endDateStr);

    const days = [
      "minggu",
      "senin",
      "selasa",
      "rabu",
      "kamis",
      "jumat",
      "sabtu",
    ];

    let current = start.clone();
    let inserted = 0;

    while (current.isSameOrBefore(end)) {
      const currentDay = days[current.day()];
      if (currentDay === day.toLowerCase()) {
        await createSchedule(
          doctor_id,
          day,
          time_start,
          time_finish,
          quota,
          status,
          current.format("YYYY-MM-DD")
        );
        inserted++;
      }
      current.add(1, "day");
    }

    res
      .status(201)
      .json({ message: `${inserted} schedules created for ${day}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create schedules" });
  }
};

export const getDoctorSchedules = async (req, res) => {
  const { doctorId } = req.params;

  console.log("Fetching schedules for doctorId:", doctorId);

  try {
    const schedules = await getDoctorSchedulesById(doctorId);

    if (schedules.length === 0) {
      return res
        .status(404)
        .json({ message: "No schedules found for this doctor" });
    }

    res.status(200).json(schedules);
  } catch (err) {
    console.error("Error fetching schedules:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch schedules", error: err.message });
  }
};
