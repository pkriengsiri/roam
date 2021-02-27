// Dependencies
const router = require("express").Router();
const expenseController = require("../../controllers/expenseController");

// Route for /api/expenses
router.route("/")
.get(expenseController.findAll)
.post(expenseController.create);

// Routes for /api/expenses/user/:id
router
  .route("/user/:id")
  .get(expenseController.findByUserId)
  .put(expenseController.edit)
  .delete(expenseController.delete);

// Routes for /api/expenses/trip/:id
router.route("/trip/:id").get(expenseController.findByTripId);

// Exports
module.exports = router;
