const express = require("express");
const router = express.Router();
const { Vehicle, Booking } = require("../models");
const { Op } = require("sequelize");

// Get vehicles by type
router.get("/", async (req, res) => {
  try {
    if (!req.query.typeId) {
      return res.status(400).json({ error: "typeId parameter is required" });
    }

    const vehicles = await Vehicle.findAll({
      where: { typeId: req.query.typeId },
    });

    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check vehicle availability
router.get("/:id/availability", async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "Both startDate and endDate parameters are required",
      });
    }

    const existingBooking = await Booking.findOne({
      where: {
        vehicleId: id,
        [Op.or]: [
          {
            [Op.and]: [
              { startDate: { [Op.lte]: endDate } },
              { endDate: { [Op.gte]: startDate } },
            ],
          },
        ],
      },
    });

    res.json({
      available: !existingBooking,
      message: existingBooking
        ? "Vehicle already booked for selected dates"
        : "Vehicle available",
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
