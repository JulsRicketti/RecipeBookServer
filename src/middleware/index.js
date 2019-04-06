const getPlatformUser = require('./get-platform-user')

module.exports = function (app) {
  app.use(getPlatformUser())
}
