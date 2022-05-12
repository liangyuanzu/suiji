import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, io } = app;
  const perfixUrl = '/api/v1';

  router.post(`${perfixUrl}/user/signup`, controller.user.signup);
  router.post(`${perfixUrl}/user/signin`, controller.user.signin);
  router.post(`${perfixUrl}/user/sign/requestResetPassword`, controller.user.requestResetPassword);
  router.post(`${perfixUrl}/user/sign/resetPassword`, controller.user.resetPassword);

  router.post(`${perfixUrl}/createProject`, controller.project.createProject);
  router.post(`${perfixUrl}/updateProject`, controller.project.updateProject);
  router.post(`${perfixUrl}/deleteProject`, controller.project.deleteProject);
  router.get(`${perfixUrl}/getProjects`, controller.project.getProjects);

  router.post(`${perfixUrl}/createTask`, controller.task.createTask);
  router.post(`${perfixUrl}/updateTask`, controller.task.updateTask);
  router.post(`${perfixUrl}/deleteTask`, controller.task.deleteTask);

  router.get(`${perfixUrl}/getTasks`, controller.task.getTasks);
  router.get(`${perfixUrl}/getTodayTasks`, controller.task.getTodayTasks);
  router.get(`${perfixUrl}/getSevenDaysTasks`, controller.task.getSevenDaysTasks);
  router.get(`${perfixUrl}/getMonthTasks`, controller.task.getMonthTasks);
  router.get(`${perfixUrl}/getRemindTasks`, controller.task.getRemindTasks);

  router.get(`${perfixUrl}/getTodayTaskCount`, controller.task.getTodayTaskCount);
  router.get(`${perfixUrl}/getSevenDaysTaskCount`, controller.task.getSevenDaysTaskCount);

  // socket.io
  // @ts-ignore
  io.of('/').route('server', io.controller.nsp.server);
};
