import pool from "../config/db.js";

export const createUser = async (username, hashedPassword) => {
  const [result] = await pool.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return result.insertId;
};

export const findUserByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, username FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};
