// Dependencies
const router = require("express").Router();
const userController = require("../../controllers/userController");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

// Routes for /api/users
router.route("/").get(userController.findAll).post(userController.create);

// Routes for /api/users/:id
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// router.route("/:userId/trips").get(userController.findByIdWithTrips);
router.get(
  "/:userId/trips",
  jwt({
      secret: process.env.SECRET,
      getToken: (req) => {
        console.log("token"+req.cookies.token)
        return req.cookies.token;
      },
      algorithms: ["HS256"],
    }).
  userController.findByIdWithTrips
);

// Export
module.exports = router;
