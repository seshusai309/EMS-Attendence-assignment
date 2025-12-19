const express = require("express");
const router = express.Router();

const {
  checkIn,
  checkOut,
  myStatus,
  liveAttendance,
  attendanceSummary,
} = require("../controllers/attendance.controller");

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/role");
const verifyOfficeWifi = require("../middleware/verifyOfficeWifi");

// Employee routes
router.post(
  "/check-in",
  auth,
  allowRoles("EMPLOYEE"),
  verifyOfficeWifi,
  checkIn
);
router.post(
  "/check-out",
  auth,
  allowRoles("EMPLOYEE"),
  verifyOfficeWifi,
  checkOut
);
router.get("/my-status", auth, allowRoles("EMPLOYEE"), myStatus);

// HR routes
router.get("/live", auth, allowRoles("HR"), liveAttendance);
router.get("/summary", auth, allowRoles("HR"), attendanceSummary);

// wifi Checking Route
router.get("/check-wifi", auth, verifyOfficeWifi, (req, res) => {
  return res.status(200).json({
    connected: true,
    message: "Connected to office Wi-Fi",
    ip: req.userIP,
  });
});

module.exports = router;
