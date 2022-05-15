const User = require("../models/userModel");
const successHandle = require("../service/handler");

const UserControllers = {
  getUserInfo: async (req, res, next) => {
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
    }
  },
};

module.exports = UserControllers;
