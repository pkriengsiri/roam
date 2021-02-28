// Dependencies
const router = require("express").Router();
const tripController = require("../../controllers/tripController");
const jwt = require("express-jwt");
// const csrf = require("csurf");
// const csrfProtection = csrf({
//   cookie: true
// });

// middleware
// router.use(csrfProtection);
router.use(
  jwt({
    secret: process.env.SECRET,
    getToken: (req) => req.cookies.token,
    algorithms: ['HS256']
  })
);

// Routes for /api/trips
router.route("/").get(tripController.findAll).post(tripController.create);

// Routes for /api/trips/:id
router
  .route("/:id")
  // .get(tripController.findById)
  .get(tripController.findByIdWithExpenses) // return the trip with the expenses
  .put(tripController.update)
  .delete(tripController.remove);


// Export
module.exports = router;
