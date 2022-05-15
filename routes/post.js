const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const PostController = require("../controllers/post");

// 獲取全體動態牆資料
router.get("/", (req, res) => PostController.getPosts(req, res));

// 新增動態牆
router.post("/", upload.single("image"), (req, res) =>
  PostController.createPost(req, res)
);

// router.delete("/", async (req, res) => {
//   await Post.deleteMany({});
//   successHandle(res, []);
// });

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const data = await Post.findByIdAndDelete(id);
//     successHandle(res, data);
//   } catch (err) {
//     console.log(err, "error");
//     errorHandle(res, 400, "id 不存在");
//   }
// });

// router.patch("/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const data = await Post.findByIdAndUpdate(id, req.body);
//     successHandle(res, data);
//   } catch (err) {
//     console.log(err, "error");
//     errorHandle(res, 400, "id 不存在");
//   }
// });

module.exports = router;
