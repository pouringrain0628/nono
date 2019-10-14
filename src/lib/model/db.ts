import { Sequelize } from 'sequelize-typescript'
import { provide, scope, ScopeEnum } from 'midway'
import { UserModel } from './user';
import { ClassModel } from './class';

interface ISequelizeConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
  dialect: string
}

// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
@scope(ScopeEnum.Singleton)
@provide('DB')
export class DB {

  public static sequelize: Sequelize

  public static async initDB(config: ISequelizeConfig) {
    DB.sequelize = new Sequelize(
      {
        database: config.database,
        username: config.username,
        password: config.password,
        dialect: 'mysql',
        host: config.host,
        port: config.port,
        timezone: '+08:00',
        logging: false,
        // operatorsAliases: false,
      },
    )

    // add models here before using them
    DB.sequelize.addModels([
      UserModel,
      ClassModel
    ]);

    try {
      await DB.sequelize.authenticate()
    }
    catch (error) {
      error.message = `DB connection error: ${error.message}`
      throw error
    }
  }

}
