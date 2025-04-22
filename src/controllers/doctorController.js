import { createDoctor, getAllDoctors } from "../models/doctorModel.js";
export const addDoctor = async (req, res) => {
  const { name } = req.body;
  try {
    const id = await createDoctor(name);
    res.status(201).json({ message: "Doctor created", doctorId: id });
  } catch (err) {
    res.status(500).json({ message: "Error adding doctor" });
  }
};

export const listDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};
