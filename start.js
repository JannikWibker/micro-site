const micro = require('micro')

let router, port

const update = () => {
  let _index = require('./index.js')(update)
  router = _index.router
  port   = _index.port
}

update()

const server = micro(router)

server.listen(port, () => {
  console.log('Server started on port ' + port)
})
