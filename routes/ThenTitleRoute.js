const express = require("express");
const { ThenTitleController } = require("../controller");
const router = express.Router();

router.get("/", ThenTitleController);
module.exports = router;
