import { Service } from 'egg';

/**
 * User Service
 */
export default class User extends Service {
  public async createUser(username: string, password: string) {
    password = this.ctx.helper.encryptText(password);
    // 查询当前用户是否存在
    const user = await this.findUser({ username });
    if (user) throw new Error('当前用户已存在');
    // 如果不存在才保存
    await this.ctx.model.User.create({
      username,
      password,
      email: username,
    });
  }

  public async getUser(username: string, password: string) {
    password = this.ctx.helper.encryptText(password);
    const user = await this.findUser({ username, password });
    if (!user) throw new Error('用户名或密码错误');
    return user;
  }

  public async updateUser(username: string, password: string) {
    password = this.ctx.helper.encryptText(password);
    // 查询当前用户是否存在
    const user = await this.findUser({ username });
    if (!user) throw new Error('用户名不存在');
    // 如果存在才更新
    await this.ctx.model.User.updateOne({ username }, { $set: { password } });
  }

  public async findUser(options) {
    return await this.ctx.model.User.findOne(options);
  }
}
