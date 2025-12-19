const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/user.routes");
const attendanceRoutes = require("./routes/attendance.routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:8080", "http://192.168.1.156:8080"],
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);

module.exports = app;
