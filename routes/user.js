const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const handleErrorAsync = require("../service/handleErrorAsync");

router.get("/", handleErrorAsync(UserController.getUserInfo));

module.exports = router;
