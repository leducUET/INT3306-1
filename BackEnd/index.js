const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");

const authRouter = require("./routes/authRoute");
const crudUserRouter = require("./routes/crudUserRoute");
const premisesRouter = require("./routes/premisesRoute");
const certificateRouter = require("./routes/certificateRoute");
const inspectionRouter = require("./routes/inspectionRoute");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

// Routing
app.use("/api/users", crudUserRouter);
app.use("/api/auth", authRouter);
app.use("/api/premises", premisesRouter);
app.use("/api/certificates", certificateRouter);
app.use("/api/inspections", inspectionRouter);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend Nodejs is running on port: ${port}`);
});
