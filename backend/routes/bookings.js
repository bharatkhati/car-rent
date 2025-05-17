const express = require("express");
const router = express.Router();
const { Booking, Vehicle } = require("../models");
const { Op } = require("sequelize");

// Create new booking
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

    // Validate input
    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check availability
    const existingBooking = await Booking.findOne({
      where: {
        vehicleId,
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

    if (existingBooking) {
      return res.status(400).json({
        error: "Vehicle already booked for selected dates",
      });
    }

    // Create booking
    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    });

    // Include vehicle details in response
    const bookingWithVehicle = await Booking.findByPk(booking.id, {
      include: [
        {
          model: Vehicle,
          as: "Vehicle",
          include: ["VehicleType"],
        },
      ],
    });

    res.status(201).json(bookingWithVehicle);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
