import pool from "../config/db.js";

export const createSchedule = async (
  doctor_id,
  day,
  time_start,
  time_finish,
  quota,
  status,
  schedule_date
) => {
  const query = `
    INSERT INTO schedules (doctor_id, day, time_start, time_finish, quota, status, schedule_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    doctor_id,
    day,
    time_start,
    time_finish,
    quota,
    status,
    schedule_date,
  ];

  try {
    await pool.query(query, values);
  } catch (err) {
    throw new Error("Failed to create schedule");
  }
};

export const getAllSchedules = async () => {
  const query = `
    SELECT js.id, d.name AS doctor_name, js.day, js.time_start, js.time_finish, js.quota, js.status, js.schedule_date
    FROM doctor_schedules js
    JOIN doctors d ON js.doctor_id = d.id
  `;

  try {
    const [schedules] = await pool.query(query);
    return schedules;
  } catch (err) {
    throw new Error("Failed to fetch schedules");
  }
};

export const getDoctorSchedulesById = async (doctorId) => {
  const query = `
    SELECT js.id, d.name AS doctor_name, js.day, js.time_start, js.time_finish, js.quota, js.status, js.schedule_date
    FROM schedules js
    JOIN doctors d ON js.doctor_id = d.id
    WHERE js.doctor_id = ?
  `;
  console.log("Executing query:", query, "with doctorId:", doctorId);

  try {
    const [schedules] = await pool.query(query, [doctorId]);
    return schedules;
  } catch (err) {
    console.error("Error in getDoctorSchedulesById:", err);
    throw new Error("Failed to fetch schedules for doctor");
  }
};
