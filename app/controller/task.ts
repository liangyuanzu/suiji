import { Controller } from 'egg';
import { CreateTaskRule, UpdateTaskRule, DeleteTaskRule, GetTasksRule, GetMonthTasksRule } from '../validate/task';

export default class TaskController extends Controller {
  public async createTask() {
    const { ctx } = this;
    try {
      ctx.validate(CreateTaskRule, ctx.request.body);
      const task = await ctx.service.task.createTask(ctx.request.body);
      ctx.success(task);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async updateTask() {
    const { ctx } = this;
    try {
      ctx.validate(UpdateTaskRule, ctx.request.body);
      const task = await ctx.service.task.updateTask(ctx.request.body);
      ctx.success(task);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async deleteTask() {
    const { ctx } = this;
    try {
      ctx.validate(DeleteTaskRule, ctx.request.body);
      await ctx.service.task.deleteTask(ctx.request.body);
      ctx.success({});
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getTasks() {
    const { ctx } = this;
    try {
      ctx.validate(GetTasksRule, ctx.request.query);
      const { projectId } = ctx.request.query;
      const tasks = await ctx.service.task.getTasks({
        projectId,
      });
      ctx.success(tasks);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getTodayTasks() {
    const { ctx } = this;
    try {
      const tasks = await ctx.service.task.getTodayTasks();
      ctx.success(tasks);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getSevenDaysTasks() {
    const { ctx } = this;
    try {
      const tasks = await ctx.service.task.getSevenDaysTasks();
      ctx.success(tasks);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getMonthTasks() {
    const { ctx } = this;
    try {
      ctx.validate(GetMonthTasksRule, ctx.request.query);
      const { month } = ctx.request.query;
      const tasks = await ctx.service.task.getMonthTasks({ month });
      ctx.success(tasks);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getRemindTasks() {
    const { ctx } = this;
    try {
      const tasks = await ctx.service.task.getRemindTasks();
      ctx.success(tasks);
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getTodayTaskCount() {
    const { ctx } = this;
    try {
      const count = await ctx.service.task.getTodayTaskCount();
      ctx.success({ count });
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }

  public async getSevenDaysTaskCount() {
    const { ctx } = this;
    try {
      const count = await ctx.service.task.getSevenDaysTaskCount();
      ctx.success({ count });
    } catch (e) {
      if (e?.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
