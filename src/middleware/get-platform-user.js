const debug = require('debug')('platform-user-sync')
const { express: getPlatformUser } = require('platform-user')

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next)

module.exports = () => {
  return [
    // Reads the platform user from headers and sets res.locals.platformUser.
    getPlatformUser(),
    wrap(async (req, res, next) => {
      const { platformUser } = res.locals

      if (!platformUser) {
        debug('Exiting platform user sync')
        next()
        return
      }

      delete res.locals.platformUser
      req.feathers.user = platformUser

      next()
    })
  ]
}
