const router = require("express").Router();

const { getImage } = require("../../controllers/placeImagesController");

router.route("/").post(getImage);

module.exports = router;
