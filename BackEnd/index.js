const express = require("express");
const connectDB = require("./config/connectDB");
const initWebRoutes = require("./routes/web");

require("dotenv").config();

const app = express();

app.use(express.json());

initWebRoutes(app);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend Nodejs is running on port: ${port}`);
});
