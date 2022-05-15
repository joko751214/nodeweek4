const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const handleErrorAsync = require("../service/handleErrorAsync");

router.get(
  "/",
  handleErrorAsync((req, res, next) =>
    UserController.getUserInfo(req, res, next)
  )
);

module.exports = router;
