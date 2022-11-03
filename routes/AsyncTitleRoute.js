const express = require("express");
const { AsyncTitleController } = require("../controller");
const router = express.Router();

router.get("/", AsyncTitleController);
module.exports = router;
