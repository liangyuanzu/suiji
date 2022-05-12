import 'egg';

declare module 'egg' {
  /** patch IO for io.of and so on */
  interface IO extends EggIOServer, EggSocketNameSpace, EggSocketIO {}
}