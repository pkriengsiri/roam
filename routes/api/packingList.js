// Dependencies
const router = require("express").Router();
const packingListController = require("../../controllers/packingListController");
const jwt = require("express-jwt");
// TODO: Add jwt route

// Route for /api/packing-list
router
  .route("/")
  .get(packingListController.findAll)
  .post(packingListController.create);

  // Route for /api/packing-list/:id
router.route("/:id")
.get(packingListController.findById)
.put(packingListController.update)
.delete(packingListController.remove);

module.exports = router;
