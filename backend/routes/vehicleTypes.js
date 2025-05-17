const express = require("express");
const router = express.Router();
const { VehicleType, Vehicle } = require("../models");
const { Op } = require("sequelize");

// Get all vehicle types (filter by wheelCount if provided)
router.get("/", async (req, res) => {
  try {
    const whereClause = {};

    if (req.query.wheelCount) {
      whereClause.wheelCount = req.query.wheelCount;
    }

    const vehicleTypes = await VehicleType.findAll({
      where: whereClause,
      include: [
        {
          model: Vehicle,
          as: "Vehicles",
        },
      ],
    });

    res.json(vehicleTypes);
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
