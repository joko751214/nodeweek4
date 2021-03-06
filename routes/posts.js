const express = require("express");
const router = express.Router();
const Post = require("../models/postsModel");
const { successHandle, errorHandle } = require("../service/handler");
const upload = require("../utils/multer");
const ImageControllers = require("../controllers/image");

// 獲取全體動態牆資料
router.get("/", async (req, res) => {
  try {
    const timeSort = req.query.timeSort === "asc" ? "createAt" : "-createAt";
    const keyword =
      req.query.keyword !== undefined
        ? { content: new RegExp(req.query.keyword) }
        : {};
    const data = await Post.find(keyword)
      .populate({
        path: "user",
        select: "name photo",
      })
      .sort(timeSort);
    setTimeout(() => {
      successHandle(res, data);
    }, 2000);
  } catch (err) {
    console.error(err);
  }
});

// 新增動態牆
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { user, content } = req.body;
    if (!content) {
      return errorHandle(res, "請填寫貼文內容");
    }
    if (!user) {
      return errorHandle(res, "Token 值不得為空");
    }
    let image = "";
    if (req.file) {
      const { data } = await ImageControllers.uploadOneFile(req);
      image = data.link !== undefined ? data.link : "";
    }
    const data = await Post.create({
      image,
      user,
      content,
    });
    successHandle(res, data);
  } catch (err) {
    console.log(err, "error");
    errorHandle(res, "參數有誤");
  }
});

router.delete("/", async (req, res) => {
  await Post.deleteMany({});
  successHandle(res, []);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Post.findByIdAndDelete(id);
    successHandle(res, data);
  } catch (err) {
    console.log(err, "error");
    errorHandle(res, "id 不存在");
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Post.findByIdAndUpdate(id, req.body);
    successHandle(res, data);
  } catch (err) {
    console.log(err, "error");
    errorHandle(res, "id 不存在");
  }
});

module.exports = router;
