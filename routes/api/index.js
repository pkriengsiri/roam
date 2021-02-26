// Dependencies
const router = require("express").Router();
const tripRoutes = require("./trips");
const userRoutes = require("./users")
const authRoutes = require("./auth");
const placeImages = require("./placeImages");

// Use routes
router.use("/trips", tripRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/placeImages", placeImages);


// Export
module.exports = router;