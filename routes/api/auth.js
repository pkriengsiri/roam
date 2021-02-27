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
} = require("../../controllers/authController");

router.route("/signup").post(createNewUser);
router.route("/login").post(loginUser);

module.exports = router;
