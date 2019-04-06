const Winston = require('winston')

module.exports = exports = Winston.createLogger({
  level: 'debug',
  // Default formatter
  format: Winston.format.json(),
  transports: [
    new Winston.transports.Console({
      format: Winston.format.simple()
    })
  ]
})