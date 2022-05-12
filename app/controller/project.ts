import { Controller } from 'egg';
import { CreateProjectRule, UpdateProjectRule, DeleteProjectRule } from '../validate/project';

export default class ProjectController extends Controller {
  public async createProject() {
    const { ctx } = this;
    try {
      ctx.validate(CreateProjectRule, ctx.request.body);
      const { name, type } = ctx.request.body;
      const params = { name };
      if (type) Object.assign(params, { type });
      const project = await ctx.service.project.createProject(params);
      ctx.success(project);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async updateProject() {
    const { ctx } = this;
    try {
      ctx.validate(UpdateProjectRule, ctx.request.body);
      const project = await ctx.service.project.updateProject(ctx.request.body);
      ctx.success(project);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async deleteProject() {
    const { ctx } = this;
    try {
      ctx.validate(DeleteProjectRule, ctx.request.body);
      await ctx.service.project.deleteProject(ctx.request.body);
      ctx.success({});
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getProjects() {
    const { ctx } = this;
    try {
      const projects = await ctx.service.project.getProjects();
      ctx.success(projects);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
