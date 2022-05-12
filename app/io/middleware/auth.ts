import jwt = require('jsonwebtoken');

module.exports = (_options, app) => {
  return async (ctx, next) => {
    const { token } = ctx.query;
    // 如果没有携带token，则关闭连接
    if (!token) return ctx.socket.disconnect();
    try {
      await jwt.verify(token, app.config.keys);
    } catch (error) {
      // 解析token失败
      return ctx.socket.disconnect();
    }
    await next();
  };
};
