const OFFICE_IP_PREFIX = process.env.OFFICE_IP;

const verifyOfficeWifi = (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    console.log("The ip address coming from client ", ip);

    if (!ip || !ip.startsWith(OFFICE_IP_PREFIX)) {
      return res.status(403).json({
        message: "Please connect to office Wi-Fi",
      });
    }

    // Store IP for attendance logging
    req.userIP = ip;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Wi-Fi verification failed",
    });
  }
};

module.exports = verifyOfficeWifi;
