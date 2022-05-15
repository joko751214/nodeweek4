const Post = require("../models/postModel");
const successHandle = require("../service/handler");
const ImageController = require("./image");

const postController = {
  getPosts: async (req, res) => {
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
      successHandle(res, data);
    } catch (err) {
      console.error(err);
    }
  },

  createPost: async (req, res) => {
    try {
      let image = "";
      if (req.file) {
        const { data } = await ImageController.uploadOneFile(req);
        image = data.link !== undefined ? data.link : "";
      }
      const body = req.body;
      const data = await Post.create({
        image,
        ...body,
      });
      successHandle(res, data);
    } catch (err) {
      console.log(err.statusCode, "error");
    }
  },
};

module.exports = postController;
