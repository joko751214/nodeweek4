const User = require("../models/userModel");
const { successHandle, errorHandle } = require("../service/handler");

const UserControllers = {
  getUserInfo: async (req, res) => {
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
      errorHandle(res, 400, "查無此人");
    }
  },
};

module.exports = UserControllers;
