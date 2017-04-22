const micro = require('micro')

let router, port, server

let prod = process.env.NODE_ENV === 'production' | process.env.NODE_ENV === 'PRODUCTION'

const start = () => {
  if(server && prod) return false
  if(server && !prod) server.close()
  let index = require('./index.js')(start, stop)
  index.start()
  server = micro(index.router)
  server.listen(index.port, () => {
    console.log('Server started on port ' + index.port)
  })
}

const stop = () => {
  if(prod) return false
  if(server) server.close()
  console.log('Server stopped')
  process.exit(0)
}

start()
