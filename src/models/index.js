const recipe = require('./recipe')
const ingredient = require('./ingredient')

module.exports = function (app) {
  const sequelize = app.get('sequelize')

  app.configure(recipe())
  app.configure(ingredient())

  Object.keys(sequelize.models)
    .map(name => sequelize.models[name])
    .filter(model => model.associate !== undefined)
    .forEach(model => {
      model.associate()
    })

  app.set('models', sequelize.models)
}
