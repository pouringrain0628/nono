import { EggAppInfo } from 'midway'

import { DefaultConfig } from './config.modal'


export default (appInfo: EggAppInfo) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570701942001_3477'

  // add your config here
  config.middleware = []

  config.security = {
    csrf: false
  }

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'gold',
    host: '192.168.50.131',
    port: '3306',
    username: 'root',
    password: 'YiyunSql@ubuntu',
    dialectOptions: {
      charset: 'utf8mb4_unicode_ci',
    },
    timezone: '+08:00',
    logging: false,
  }

  config.weapp = {
    appId: 'wxf222bff5591b5b8f',
    appSecret: 'aa7e894ccc0c748062af3b7e948c0835',
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
