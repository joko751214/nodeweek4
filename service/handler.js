const successHandle = (res, data = [], status = 200) => {
  res.status(status).json({
    status,
    data,
  });
};

const errorHandle = (res, message, code = 400) => {
  res.status(code).json({
    status: "false",
    message,
  });
};

module.exports = { successHandle, errorHandle };
