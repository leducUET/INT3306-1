const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");

const authRouter = require("./routes/authRoute");
const adminRouter = require("./routes/adminRoute");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

// Routing
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend Nodejs is running on port: ${port}`);
});
