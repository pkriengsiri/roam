// Dependencies
const router = require("express").Router();
const tripRoutes = require("./trips");
const userRoutes = require("./users")
const authRoutes = require("./auth");

// Use routes
router.use("/trips", tripRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

// Export
module.exports = router;