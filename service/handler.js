const successHandle = (res, data = [], status = 200) => {
  res.status(status).json({
    status,
    data,
  });
};

module.exports = successHandle;
