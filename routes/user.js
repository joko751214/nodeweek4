const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/", async (req, res) => UserController.getUserInfo(req, res));

module.exports = router;
