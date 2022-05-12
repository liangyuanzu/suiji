import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 禁用 CSRF 安全校验
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
