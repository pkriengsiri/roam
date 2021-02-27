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

// Routes for /api/users/:id/expenses
router
  .route("/:id/expenses")
  .get(userController.findByIdWithExpenses)

// Export
  module.exports = router;