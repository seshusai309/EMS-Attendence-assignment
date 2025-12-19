const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

db();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
