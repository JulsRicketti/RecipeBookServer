const Sequelize = require('sequelize')
const Config = require('../../../config')
const Logger = require('../../logger')

module.exports = function DbContextPlugin () {
  return function DbContext (app) {
    const sequelize = new Sequelize(Config.DATABASE_URL, {
      dialect: 'postgres',
      logging: Config.SEQUELIZE_LOGGING ? Logger.info : false
    })

    app.set('sequelize', sequelize)
  }
}
