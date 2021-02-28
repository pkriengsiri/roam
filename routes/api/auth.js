//Dependencies
const router = require("express").Router();

// Import controller
const {
    createNewUser, 
    loginUser,
    reLogin
} = require("../../controllers/authController");

// Routes for /API/auth
router.route('/relogin').get(reLogin);
router.route("/signup").post(createNewUser);
router.route("/login").post(loginUser);

// Export
module.exports = router;
