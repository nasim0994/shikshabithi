const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.port || 3001;
const apiRoutes = require("./src/routes/index");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "500mb",
  })
);

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

// API Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
