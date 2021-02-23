// Dependencies
const router = require("express").Router();
const tripRoutes = require("./trips");
const userRoutes = require("./users")

router.use("/users", userRoutes);
router.use("/trips", tripRoutes);

module.exports = router;