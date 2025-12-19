const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    checkInTime: {
      type: Date,
      required: false,
    },

    checkOutTime: {
      type: Date,
      required: false,
    },

    status: {
      type: String,
      enum: ["CHECKED_IN", "CHECKED_OUT", "NOT_MARKED"],
      default: "NOT_MARKED",
    },

    ipAddress: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "Main Office",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
