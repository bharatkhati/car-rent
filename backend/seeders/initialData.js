module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create vehicle types
    const vehicleTypes = await queryInterface.bulkInsert(
      "VehicleTypes",
      [
        {
          name: "Hatchback",
          wheelCount: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "SUV",
          wheelCount: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sedan",
          wheelCount: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sports Bike",
          wheelCount: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    // Create vehicles
    await queryInterface.bulkInsert("Vehicles", [
      {
        model: "Toyota Yaris",
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Honda CR-V",
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Toyota Camry",
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Yamaha R15",
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete("Vehicles", null, {});
    await queryInterface.bulkDelete("VehicleTypes", null, {});
  },
};
