import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import scheduleRoutes from "./src/routes/scheduleRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    system: "healthy",
    author: "Backend System with ExpressJS and MySQL",
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use(bodyParser.json());

app.use("/api/schedules", scheduleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
