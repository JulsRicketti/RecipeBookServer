const Path = require('path')
const feathers = require('@feathersjs/feathers')
const Errors = require('@feathersjs/errors')
const express = require('@feathersjs/express')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const Config = require('../config')
const plugins = require('./plugins')
const models = require('./models')
const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')

const app = express(feathers())

/* SETTINGS */

// NOTE: Because port binding might be deferred to the OS, this app setting
// should only be read *after* the 'listening' advisor is emitted from the
// express app.
app.set('port', Config.PORT)

/* MIDDLEWARE */

const corsOptions = {
  credentials: true,
  methods: [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD' ],
  origin: function (origin, callback) {
    if (!origin || Config.CORS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS: ' + origin))
    }
  }
}

app.options('*', cors(corsOptions))
// Enable CORS, security, compression, favicon and body parsing
app.use(cors(corsOptions))
app.use(helmet({
  // Enable the noCache middleware
  noCache: true,
  hsts: {
    maxAge: 31536000
  }
}))
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.configure(express.rest())
app.configure(middleware)

/* PLUGINS */

app.configure(plugins)
app.configure(models)
app.configure(services)
app.hooks(appHooks)

/* ROUTING */

app.use((req, res, next) => {
  next(new Errors.NotFound('Resource not found'))
})

app.use(express.errorHandler({
  html: {
    401: Path.resolve(__dirname, '../public/401.html'),
    404: Path.resolve(__dirname, '../public/404.html'),
    default: Path.resolve(__dirname, '../public/default-error.html')
  }
}))

module.exports = exports = app
