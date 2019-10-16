import { EggAppInfo } from 'midway'

import { DefaultConfig } from './config.modal'


export default (appInfo: EggAppInfo) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570701942001_3477'

  // add your config here
  config.middleware = ['errorHandler', 'auth']

  config.auth = {
    enable: true,
    match(ctx: any) {
      const url = ctx.url.split('?')[0];
      console.log(url);
      const whiteList = [`index/login`, `index/userInfo`];
      return !whiteList.find(val => {
        return (new RegExp(val + '$')).test(url);
      });
    },
  }

  config.security = {
    csrf: false
  }


  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'gold',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'dai960513',
    dialectOptions: {
      charset: 'utf8mb4_unicode_ci',
    },
    timezone: '+08:00',
    logging: false,
  }

  config.weapp = {
    appId: '',
    appSecret: '',
  }

  config.jwt = {
    secret: 'madan',
  }

  config.cluster = {
    listen: {
      port: 7021
    }
  }

  return config
}
