const Attendance = require("../models/Attendance");
const User = require("../models/user");

// Employee Check-In
const checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    // Check if attendance already exists for today
    const existingAttendance = await Attendance.findOne({
      userId,
      date: today,
    });

    if (existingAttendance && existingAttendance.status === "CHECKED_IN") {
      return res.status(400).json({
        message: "Already checked in for today",
      });
    }

    if (existingAttendance && existingAttendance.status === "CHECKED_OUT") {
      return res.status(400).json({
        message: "Already checked out for today",
      });
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkInTime: new Date(),
      status: "CHECKED_IN",
      ipAddress: req.userIP,
    });

    return res.status(201).json({
      message: "Checked in successfully",
      checkInTime: attendance.checkInTime,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Check-in failed",
    });
  }
};

// Employee Check-Out
const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      userId,
      date: today,
    });

    if (!attendance || attendance.status !== "CHECKED_IN") {
      return res.status(400).json({
        message: "You must check in before checking out",
      });
    }

    attendance.checkOutTime = new Date();
    attendance.status = "CHECKED_OUT";
    attendance.ipAddress = req.userIP;

    await attendance.save();

    return res.status(200).json({
      message: "Checked out successfully",
      checkOutTime: attendance.checkOutTime,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Check-out failed",
    });
  }
};

// Employee - Get Today's Attendance Status
const myStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      userId,
      date: today,
    });

    if (!attendance) {
      return res.status(200).json({
        status: "NOT_MARKED",
      });
    }

    return res.status(200).json({
      status: attendance.status,
      checkInTime: attendance.checkInTime,
      checkOutTime: attendance.checkOutTime,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch status",
    });
  }
};

// HR - Live Attendance Status
const liveAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const employees = await User.find({ role: "EMPLOYEE" }).select(
      "name department position"
    );

    const attendanceRecords = await Attendance.find({ date: today });

    const attendanceMap = {};
    attendanceRecords.forEach((record) => {
      attendanceMap[record.userId.toString()] = record;
    });

    const response = employees.map((employee) => {
      const record = attendanceMap[employee._id.toString()];

      if (!record) {
        return {
          name: employee.name,
          department: employee.department,
          position: employee.position,
          status: "NOT_MARKED",
          checkInTime: null,
          checkOutTime: null,
        };
      }

      return {
        name: employee.name,
        department: employee.department,
        position: employee.position,
        status: record.status,
        checkInTime: record.checkInTime,
        checkOutTime: record.checkOutTime,
      };
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch live attendance",
    });
  }
};

// HR - Attendance Summary
const attendanceSummary = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const totalStaff = await User.countDocuments({ role: "EMPLOYEE" });

    const records = await Attendance.find({ date: today });

    const checkedIn = records.filter((r) => r.status === "CHECKED_IN").length;

    const checkedOut = records.filter((r) => r.status === "CHECKED_OUT").length;

    const notMarked = totalStaff - records.length;

    const presentPercentage =
      totalStaff === 0
        ? 0
        : Math.round(((checkedIn + checkedOut) / totalStaff) * 100);

    return res.status(200).json({
      totalStaff,
      checkedIn,
      checkedOut,
      notMarked,
      presentPercentage,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch attendance summary",
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  myStatus,
  liveAttendance,
  attendanceSummary,
};
