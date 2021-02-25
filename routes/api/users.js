// Dependencies
const router = require("express").Router();
const userController = require("../../controllers/userController");

// Routes for /api/users
router.route("/")
.get(userController.findAll)
.post(userController.create);

// Routes for /api/users/:id
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

router
.route("/:userId/trips")
.get(userController.findByIdWithTrips)

// Export
  module.exports = router;