import Encrypto from '../util/encrypto';
import EmailCode from '../util/emailCode';

module.exports = {
  encryptText(text: string) {
    return Encrypto.encryptText(this, text);
  },

  async sendEmailCode(to: string) {
    return await EmailCode.sendEmailCode(this.ctx, to);
  },

  verifyEmailCode(clientCode: string) {
    EmailCode.verifyEmailCode(this.ctx, clientCode);
  },

  getUserId() {
    const { ctx } = this;

    const { id } = ctx.session?.user;
    if (!id) throw new Error('登录已过期，请重新登录');

    return id;
  },
};
