// Dependencies
const router = require("express").Router();
const tripRoutes = require("./trips");
const userRoutes = require("./users")

// Use routes
router.use("/trips", tripRoutes);
router.use("/users", userRoutes);

// Export
module.exports = router;