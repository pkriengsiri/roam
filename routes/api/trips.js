// Dependencies
const router = require("express").Router();
const tripsController = require("../../controllers/tripsController");

// Routes for /api/trips
router.route("/").get(tripsController.findAll).post(tripsController.create);

// Routes for /api/trips/:id
router
  .route("/:id")
  .get(tripsController.findById)
  .put(tripsController.update)
  .delete(tripsController.remove);

// Export
module.exports = router;
