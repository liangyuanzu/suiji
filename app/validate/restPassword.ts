export default {
  username: {
    type: 'string',
    trim: true,
    format: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '邮箱格式不正确',
  },
  password: {
    type: 'string',
    trim: true,
    min: 6,
    max: 18,
    message: '密码长度为6-18个字符',
  },
  code: {
    type: 'string',
    trim: true,
    format: /^\d{6}$/,
    message: '验证码格式不正确',
  },
};
