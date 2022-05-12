import { Controller } from 'egg';
import jwt = require('jsonwebtoken');
import SignRule from '../validate/sign';
import UsernameRule from '../validate/username';
import ResetPasswordRule from '../validate/restPassword';
import { ProjectType } from '../service/project';

export default class UserController extends Controller {
  public async signup() {
    const { ctx } = this;
    try {
      // 校验数据
      ctx.validate(SignRule, ctx.request.body);
      // 将校验通过的数据保存到数据库中
      const { username, password } = ctx.request.body;
      await ctx.service.user.createUser(username, password);
      ctx.success({});
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async signin() {
    const { ctx } = this;
    try {
      ctx.validate(SignRule, ctx.request.body);
      const { username, password } = ctx.request.body;
      const user = await ctx.service.user.getUser(username, password);
      // 生成 JWT 令牌
      const obj: any = {
        userId: user.id,
        username: user.username,
        email: user.email,
      };
      const token = jwt.sign(obj, this.config.keys, { expiresIn: '7 days' });
      obj.token = token;
      ctx.session.user = user;
      ctx.success(obj);

      // 创建收集箱清单
      const project = await ctx.service.project.findProject({ name: '收集箱' });
      if (!project) await ctx.service.project.createProject({ name: '收集箱', type: ProjectType.INBOX });
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async requestResetPassword() {
    const { ctx } = this;
    try {
      ctx.validate(UsernameRule, ctx.request.body);
      const { username } = ctx.request.body;
      const user = await ctx.service.user.findUser({ username });
      if (!user) throw new Error('用户名不存在');
      await ctx.helper.sendEmailCode(username);
      ctx.success({});
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async resetPassword() {
    const { ctx } = this;
    try {
      ctx.validate(ResetPasswordRule, ctx.request.body);
      const { username, password, code } = ctx.request.body;
      // 验证验证码
      ctx.helper.verifyEmailCode(code);
      await ctx.service.user.updateUser(username, password);
      ctx.success({});
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
