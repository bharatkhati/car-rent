const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const vehicleTypesRoutes = require("./routes/vehicleTypes");
const vehiclesRoutes = require("./routes/vehicles");
const bookingsRoutes = require("./routes/bookings");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/vehicle-types", vehicleTypesRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/bookings", bookingsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

module.exports = app;
