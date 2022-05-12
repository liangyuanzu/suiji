import { Service } from 'egg';
import dayjs = require('dayjs');

interface TaskType {
  id: string
  projectId: string
  title: string
  content?: string
  checked?: boolean
  startTime?: number
  endTime?: number
  remindTime?: number
}

type UpdateTaskParams = Partial<Omit<TaskType, 'projectId' | 'id'>> & { id: string };

/**
 * Task Service
 */
export default class Task extends Service {
  public async createTask(obj: { projectId: string, title: string, content?: string}) {
    const { ctx } = this;
    const userId = ctx.helper.getUserId();

    const task = await ctx.model.Task.create({ userId, ...obj });
    await ctx.model.Project.updateOne({ _id: task.projectId }, { $inc: { taskCount: 1 } });

    return {
      id: task._id,
      projectId: task.projectId,
      title: task.title,
      content: task.content,
      checked: task.checked,
      startTime: task.startTime,
      endTime: task.endTime,
      remindTime: task.remindTime,
    };
  }

  public async updateTask({ id, title, content, checked, startTime, endTime, remindTime }: UpdateTaskParams) {
    const { ctx } = this;

    const task = await this.findTask({ _id: id });
    if (!task) throw new Error('任务不存在');

    const params: Omit<UpdateTaskParams, 'id'> = {};
    if (title) params.title = title;
    if (content !== undefined) params.content = content;
    if (checked !== undefined) params.checked = checked;
    if (startTime !== undefined) params.startTime = startTime;
    if (endTime !== undefined) params.endTime = endTime;
    if (remindTime !== undefined) params.remindTime = remindTime;

    await ctx.model.Task.updateOne({ _id: id }, { $set: params });
    return {
      id,
      projectId: task.projectId,
      title: title ?? task.title,
      content: content ?? task.content,
      checked: checked ?? task.checked,
      startTime: startTime ?? task.startTime,
      endTime: endTime ?? task.endTime,
      remindTime: remindTime ?? task.remindTime,
    };
  }

  public async deleteTask({ id }: { id: string}) {
    const { ctx } = this;

    const task = await this.findTask({ _id: id });
    if (!task) throw new Error('任务不存在');

    await ctx.model.Task.deleteOne({ _id: id });
    await ctx.model.Project.updateOne({ _id: task.projectId }, { $inc: { taskCount: -1 } });
  }

  public async getTasks({ projectId }: { projectId: string }) {
    const { ctx } = this;

    const project = await ctx.service.project.findProject({ _id: projectId });
    if (!project) throw new Error('清单不存在');

    const userId = ctx.helper.getUserId();
    const tasks = await ctx.model.Task.find({ userId, projectId }, { created: 0, updated: 0, __v: 0 });
    tasks.reverse();

    return tasks;
  }

  public async getTodayTasks() {
    const startTime = dayjs().startOf('day').unix();
    const endTime = dayjs().endOf('day').unix();

    const { ctx } = this;
    const userId = ctx.helper.getUserId();
    const tasks = await ctx.model.Task.find({ userId, $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] }, { created: 0, updated: 0, __v: 0 });
    tasks.reverse();

    return tasks;
  }

  public async getSevenDaysTasks() {
    const startTime = dayjs().startOf('day').unix();
    const endTime = dayjs().add(1, 'week').endOf('day')
      .unix();

    const { ctx } = this;
    const userId = ctx.helper.getUserId();
    const tasks = await ctx.model.Task.find({ userId, $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] }, { created: 0, updated: 0, __v: 0 });
    tasks.reverse();

    return tasks;
  }

  public async getMonthTasks({ month }: { month: string }) {
    const startTime = dayjs(month).subtract(2, 'week').unix();
    const days = dayjs(month).daysInMonth();
    const endTime = dayjs(month).add(days, 'day').add(2, 'week')
      .endOf('day')
      .unix();

    const { ctx } = this;
    const userId = ctx.helper.getUserId();
    const tasks = await ctx.model.Task.find({ userId, $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] }, { created: 0, __v: 0 }).sort({ updated: -1 });

    const monthTaskMap = {};
    tasks.forEach((task: TaskType) => {
      const startDay = dayjs.unix(task.startTime!);
      const endDay = dayjs.unix(task.endTime!);

      let start = startDay;
      const end = endDay;
      while (start.unix() <= end.unix()) {
        const key = start.format('MM-DD');
        if (monthTaskMap[key] === undefined) {
          monthTaskMap[key] = [ task ];
        } else {
          monthTaskMap[key].push(task);
        }

        start = startDay.add(1, 'day');
      }
    });

    return monthTaskMap;
  }

  public async getRemindTasks() {
    const { ctx } = this;
    const userId = ctx.helper.getUserId();

    const remindTasks = await ctx.model.Task.find({ userId, remindTime: { $gt: dayjs().unix() } }, { created: 0, updated: 0, __v: 0 });
    const tasks = remindTasks.filter((task: TaskType) => task.remindTime! <= task.startTime!);
    tasks.sort((a, b) => a.remindTime - b.remindTime);

    return tasks;
  }

  public async getTodayTaskCount() {
    const startTime = dayjs().startOf('day').unix();
    const endTime = dayjs().endOf('day').unix();

    const { ctx } = this;
    const userId = ctx.helper.getUserId();
    const count = await ctx.model.Task.count({ userId, $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] });

    return count;
  }

  public async getSevenDaysTaskCount() {
    const startTime = dayjs().startOf('day').unix();
    const endTime = dayjs().add(1, 'week').endOf('day')
      .unix();

    const { ctx } = this;
    const userId = ctx.helper.getUserId();
    const count = await ctx.model.Task.count({ userId, $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] });

    return count;
  }

  private async findTask(options) {
    const { ctx } = this;

    const userId = ctx.helper.getUserId();
    return await ctx.model.Task.findOne({
      userId,
      ...options,
    });
  }
}
