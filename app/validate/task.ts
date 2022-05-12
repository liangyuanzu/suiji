import { ProjectIdRule } from './project';

export const TaskTitleRule = {
  type: 'string',
  trim: true,
  allowEmpty: false,
  max: 30,
  message: '任务标题长度最长为30个字符',
};

export const TaskIdRule = {
  type: 'string',
  trim: true,
  allowEmpty: false,
};

export const CreateTaskRule = {
  projectId: ProjectIdRule,
  title: TaskTitleRule,
};

export const UpdateTaskRule = {
  id: TaskIdRule,
  title: {
    ...TaskTitleRule,
    required: false,
  },
  content: {
    type: 'string?',
  },
  checked: {
    type: 'boolean?',
  },
  startTime: {
    type: 'number?',
  },
  endTime: {
    type: 'number?',
  },
  remindTime: {
    type: 'number?',
  },
};

export const DeleteTaskRule = {
  id: TaskIdRule,
};

export const GetTasksRule = {
  projectId: ProjectIdRule,
};

export const GetMonthTasksRule = {
  month: {
    type: 'string',
    trim: true,
    allowEmpty: false,
    format: /^\d{4}-((0([1-9]))|(1(0|1|2)))$/,
    message: '格式不正确',
  },
};
