const DbContext = require('./DbContext')

module.exports = function (app) {
  app.configure(DbContext())
}
