// Dependencies
const router = require("express").Router();
const tripRoutes = require("./trips");
const userRoutes = require("./users")
const authRoutes = require("./auth");
// const placeImages = require("./placeImages");
const expenseRoutes = require("./expenses")
const packingListRoutes = require("./packingList")

// Use routes
router.use("/trips", tripRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
// router.use("/placeImages", placeImages);
router.use("/expenses",expenseRoutes);
router.use("/packing-lists", packingListRoutes)



// Export
module.exports = router;