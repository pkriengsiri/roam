const router = require("express").Router();

const { getImage } = require("../../controllers/placeImagesController");

router.route("/").get(getImage);

module.exports = router;
