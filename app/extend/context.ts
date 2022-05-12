module.exports = {
  success(data, status = 0, msg = 'success') {
    this.body = {
      code: status,
      msg,
      data,
    };
  },
  error(status = 500, msg = '错误') {
    this.body = {
      code: status,
      msg,
    };
  },
};
