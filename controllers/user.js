const User = require("../models/userModel");
const handleSuccess = require("../service/handlerSuccess");
const appError = require("../service/appError");

const UserControllers = {
  getUserInfo: async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
      return appError(400, "缺少 Token 參數", next);
    }
    const data = await User.findById(token);
    handleSuccess(res, data);
  },
};

module.exports = UserControllers;
