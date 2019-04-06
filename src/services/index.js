const recipes = require('./recipes')

module.exports = exports = function (app) {
  app.configure(recipes)
}

