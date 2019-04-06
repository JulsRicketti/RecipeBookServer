const service = require('feathers-sequelize')
const hooks = require('./hooks')

module.exports = function (app) {
  const { ingredient: Model } = app.get('models')

  let options = {
    id: '_id',
    Model,
    paginate: {
      default: 25,
      max: 50
    }
  }

  app.use('/ingredients', service(options))

  const ingredientService = app.service('/ingredients')
  ingredientService.hooks(hooks)
}
