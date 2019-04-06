let config = {}

config.PORT = process.env.PORT
config.DATABASE_URL = process.env.DATABASE_URL
config.CORS_WHITELIST = process.env.CORS_WHITELIST || ''
config.SEQUELIZE_LOGGING = true
// All the above env vars are required
Object.keys(config).forEach(key => {
  const value = config[key]
  if (value === undefined) {
    throw new Error(`${key} is required`)
  }
})

module.exports = exports = config
