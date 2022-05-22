const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const { successHandle, errorHandle } = require("../service/handler");
require("dotenv").config({ path: "./config.env" });
const upload = require("../utils/multer");

router.get("/", async (req, res) => {
  try {
    const { token } = req.query;
    if (token !== undefined) {
      const data = await User.findById(token);
      setTimeout(() => {
        successHandle(res, data);
      }, 5000);
    }
  } catch (err) {
    console.error(err);
    errorHandle(res, "查無此人");
  }
});

router.post("/me/photo", upload.single("photo"), async (req, res) => {
  console.log(req.file, "file");
});

module.exports = router;
