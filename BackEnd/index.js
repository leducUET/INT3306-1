const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");

const authRouter = require("./routes/authRoute");
const initRouter = require("./routes/initRoute");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Routing
app.use("/init", initRouter);
app.use("/api/auth", authRouter);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend Nodejs is running on port: ${port}`);
});
