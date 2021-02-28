//Dependencies
const router = require("express").Router();

// Import controller
const {
    createNewUser, 
    loginUser,
    reLogin,
    logout
} = require("../../controllers/authController");

// Routes for /API/auth
router.route('/relogin').get(reLogin);
router.route("/signup").post(createNewUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

// Export
module.exports = router;
