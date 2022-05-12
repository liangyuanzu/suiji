export const ProjectIdRule = {
  type: 'string',
  trim: true,
  allowEmpty: false,
};

export const ProjectNameRule = {
  type: 'string',
  trim: true,
  allowEmpty: false,
  max: 20,
  message: '清单名称长度最长为20个字符',
};

export const ProjectTypeRule = {
  type: 'enum',
  values: [ 'inbox', 'normal' ],
  required: false,
  message: '清单类型不正确',
};

export const CreateProjectRule = {
  name: ProjectNameRule,
  type: ProjectTypeRule,
};

export const UpdateProjectRule = {
  id: ProjectIdRule,
  name: ProjectNameRule,
};

export const DeleteProjectRule = {
  id: ProjectIdRule,
};
