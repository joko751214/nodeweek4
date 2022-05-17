const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const handleErrorAsync = require("../service/handleErrorAsync");

router.get("/", handleErrorAsync(UserController.getUserInfo));

module.exports = router;
