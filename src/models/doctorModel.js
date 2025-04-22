import pool from "../config/db.js";

export const getAllDoctors = async () => {
  const [rows] = await pool.query("SELECT * FROM doctors");
  return rows;
};

export const getDoctorById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM doctors WHERE id = ?", [id]);
  return rows[0];
};

export const createDoctor = async (name) => {
  const [result] = await pool.query("INSERT INTO doctors (name) VALUES (?)", [
    name,
  ]);
  return result.insertId;
};
