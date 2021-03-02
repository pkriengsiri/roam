// Dependencies
const router = require("express").Router();
const packingListItemController = require("../../controllers/packingListItemController");
const jwt = require("express-jwt");

// middleware
// router.use(csrfProtection);
// router.use(
//     jwt({
//       secret: process.env.SECRET,
//       getToken: (req) => req.cookies.token,
//       algorithms: ['HS256']
//     })
//   );

// Route for /api/packing-lists
router
  .route("/")
  .get(packingListItemController.findAll)
  .post(packingListItemController.create);

  // Route for /api/packing-lists/:id
router.route("/:id")
.get(packingListItemController.findByTripId)
.delete(packingListItemController.remove);

// .put(packingListItemController.update)



module.exports = router;
