import { Service } from 'egg';

export const enum ProjectType {
  INBOX = 'inbox',
  NORMAL = 'normal'
}

/**
 * Project Service
 */
export default class Project extends Service {
  public async createProject({ name, type }:{ name: string, type?: ProjectType }) {
    const project = await this.findProject({ name });
    if (project) throw new Error('重复的清单名称');

    const { ctx } = this;
    const userId = ctx.helper.getUserId();

    if (type === ProjectType.INBOX) {
      const inboxProjectCount = await ctx.model.Project.count({ userId, type: 'inbox' });
      if (inboxProjectCount >= 1) throw new Error('收集箱清单达到上限');
    }
    const obj = {
      userId,
      name,
      taskCount: 0,
    };
    if (type) Object.assign(obj, { type });

    const res = await ctx.model.Project.create(obj);

    return {
      id: res._id,
      name: res.name,
      type: res.type,
      taskCount: res.taskCount,
    };
  }

  public async updateProject({ id, name }: { id: string, name: string }) {
    const project = await this.findProject({ _id: id });
    if (!project) throw new Error('清单不存在');

    const { ctx } = this;
    await ctx.model.Project.updateOne({ _id: id }, { $set: { name } });

    return {
      id,
      name,
      type: project.type,
      taskCount: project.taskCount,
    };
  }

  public async deleteProject({ id }: { id: string }) {
    const project = await this.findProject({ _id: id });
    if (!project) throw new Error('清单不存在');

    const { ctx } = this;
    await ctx.model.Task.remove({ projectId: id });
    await ctx.model.Project.deleteOne({ _id: id });
  }

  public async getProjects() {
    const { ctx } = this;

    const userId = ctx.helper.getUserId();

    const inbox = await ctx.model.Project.findOne({ userId, type: ProjectType.INBOX }, { created: 0, updated: 0, __v: 0 });
    const normal = await ctx.model.Project.find({ userId, type: ProjectType.NORMAL }, { created: 0, updated: 0, __v: 0 });
    normal.reverse();

    return {
      inbox,
      normal,
    };
  }

  public async findProject(options) {
    const { ctx } = this;

    const userId = ctx.helper.getUserId();
    return await ctx.model.Project.findOne({
      userId,
      ...options,
    });
  }
}
