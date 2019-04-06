/*
The server module, responsible for running the bootscripts and listening for
HTTP connections.
*/

const Config = require('../config')
const app = require('./app')
const Logger = require('./logger')

async function start () {
  return listen()
}

function listen () {
  return new Promise(resolve => {
    const server = app.listen(Config.PORT)
    server.on('listening', () => {
      const { port } = server.address()
      app.set('port', port)
      Logger.info(`Server listening on 127.0.0.1:${port}`)
      app.emit('listening')
      resolve(server)
    })
  })
}

exports.start = start

if (require.main === module) {
  start().catch(e => {
    console.error(e)
    process.exit(1)
  })
}
