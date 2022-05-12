import { Controller } from 'egg';

export default class NspController extends Controller {
  async server() {
    const { app } = this;
    const nsp = app.io.of('/');
    // const message = ctx.args[0] || {};
    // const socket = ctx.socket;
    // const client = socket.id;

    try {
      // const { target, payload } = message;
      // if (!target) return;
      // const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
      // @ts-ignore
      // nsp.emit(target, msg);

      nsp.emit('test', {
        message: '测试的数据',
      });
    } catch (error) {
      app.logger.error(error);
    }
  }
}
