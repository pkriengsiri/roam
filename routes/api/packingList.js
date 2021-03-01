// Dependencies
const router = require("express").Router();
const packingListController = require("../../controllers/packingListController");
const jwt = require("express-jwt");

// middleware
// router.use(csrfProtection);
router.use(
    jwt({
      secret: process.env.SECRET,
      getToken: (req) => req.cookies.token,
      algorithms: ['HS256']
    })
  );

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
