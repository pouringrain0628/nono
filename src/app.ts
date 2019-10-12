/* eslint-disable no-console */
import { DB } from './lib/model/db'

// build db connections when starting APP
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export = (app: any) => {
  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...')

    await DB.initDB(app.config.sequelize)

    console.log('✅  Your awesome APP launched')
  })
}
