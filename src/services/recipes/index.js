const service = require('feathers-sequelize')
const hooks = require('./hooks')

module.exports = function (app) {
  const { recipe: Model } = app.get('models')

  let options = {
    id: '_id',
    Model,
    paginate: {
      default: 25,
      max: 50
    }
  }

  app.use('/recipes', service(options))

  const recipeService = app.service('/recipes')
  recipeService.hooks(hooks)
}
