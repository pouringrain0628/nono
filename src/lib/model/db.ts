import { Sequelize } from 'sequelize-typescript'
import { provide, scope, ScopeEnum } from 'midway'
import { UserModel } from './user';
import { ClassModel } from './class';
import { BannerModel } from './banner';
import { AdminModel } from './admin';
import { GoodsModel } from './goods';

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

    const modelsArr = [UserModel, ClassModel, GoodsModel, BannerModel, AdminModel];

    // add models here before using them
    DB.sequelize.addModels(modelsArr);

    // 必须在addModels之后才能调用model上的sync方法，因为sync方法要求model必须先调用init,addModel方法内部会调用init
    // modelsArr.forEach(model => {
    //   model.sync({ alter: true })
    // });

    try {
      await DB.sequelize.authenticate()
    }
    catch (error) {
      error.message = `DB connection error: ${error.message}`
      throw error
    }
  }

}
