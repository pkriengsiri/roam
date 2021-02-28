const router = require("express").Router();

// app.use(cookieParser());
// app.use(
//   jwt({
//     secret: process.env.SECRET,
//     getToken: (req) => req.cookies.token,
//     algorithms: ['RS256']
//   })
// );


const {
    createNewUser, 
    loginUser,
    reLogin
} = require("../../controllers/authController");

router.route('/relogin').get(reLogin);
router.route("/signup").post(createNewUser);
router.route("/login").post(loginUser);

module.exports = router;
