const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "貼文 ID 未填寫"],
  },
  image: {
    type: String,
    default: "",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: [true, "Content 未填寫"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
