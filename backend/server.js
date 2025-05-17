const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 5000;

// Test database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    return sequelize.sync(); // { force: true } for development to reset db
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
