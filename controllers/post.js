const Post = require("../models/postModel");
const handleSuccess = require("../service/handlerSuccess");
const ImageController = require("./image");
const appError = require("../service/appError");

const postController = {
  getPosts: async (req, res) => {
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
    handleSuccess(res, data);
  },

  createPost: async (req, res, next) => {
    let image = "";
    const { user, content } = req.body;
    if (!user) return appError(400, "缺少 user ID", next);
    if (!content) return appError(400, "未填寫貼文內容", next);
    if (req.file) {
      const { data } = await ImageController.uploadOneFile(req);
      image = data.link !== undefined ? data.link : "";
    }
    const data = await Post.create({
      image,
      user,
      content,
    });
    handleSuccess(res, data);
  },
};

module.exports = postController;
