// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProject from '../../../app/model/project';
import ExportTask from '../../../app/model/task';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Project: ReturnType<typeof ExportProject>;
    Task: ReturnType<typeof ExportTask>;
    User: ReturnType<typeof ExportUser>;
  }
}
