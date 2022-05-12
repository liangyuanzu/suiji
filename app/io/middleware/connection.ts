module.exports = () => {
  return async (ctx, next) => {
    ctx.socket.emit('client_success', {
      message: 'client_success',
      data: ctx.success({
        message: `${ctx.headers.origin}客户端连接成功`,
      }),
    });
    await next();
    // 当有客户端退出的时候，执行以下操作
    const origin = ctx.request.headers.origin;
    console.log(`${origin} 用户退出!`);
  };
};
