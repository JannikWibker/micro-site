const micro = require('micro')
const send = micro.send
const { router, get } = require('microrouter')
const fsp = require('fs-promise')
const hbs = require('handlebars')
const mime = require('mime-types')

const routes = require('./routes.js')

const sendhbs_ = require('./lib/sendhbs.js')
const _static_ = require('./lib/static.js')

// ## options:
// ### site folder
const dir = './site'
// ### static folder
const static_dir = 'static'
// ### the actual file system path to the pages (omit *dir* folder in path)
const files = [
  'index.hbs', 'about.hbs', 'blog.hbs'
]
// ### port
const port = process.argv[2] || process.env.PORT || 3000

let compiled_files = {}
let posts = []

// #### start fn: loads the the files and saves the data to variables
const start = async(dir) => {
  console.log('start fn call')
  files.push('_document.hbs', '_error.hbs')
  posts = JSON.parse(await fsp.readFile('./posts.json'))
  files.forEach(async (file, i) =>
    compiled_files[dir + '/' + file] =
      await hbs.compile(await fsp.readFile(dir + '/' + file, 'utf8')))
}

// #### 404 page
const notfound = async (req, res) => {
  sendhbs(res, '/_error.hbs', {
    title: 'error',
    file: '_error',
    error_code: '404',
    error_message: 'page not found',
  }, false)
}

// #### static files
const _static = _static_(send, fsp, mime)

// #### sending and rendering handlebars (.hbs) files
const sendhbs = sendhbs_(send, notfound, compiled_files, dir)



// #### all routes from './routes.js'
const { index, blog, blog_post, about } = routes(send, sendhbs, () => posts)

// ### starting micro programmatically
module.exports = (reload, stop) => ({
  port: port,
  date: new Date().toJSON(),
  start: start.bind(this, dir),
  router: router(
    get('/', index),
    get('/index', index),
    get('/blog', blog),
    get('/blog/:id', blog_post),
    get('/about', about),
    get('/' + static_dir + '/*', _static),
    get('/_site/reload', (res, req) => { reload();return 'reloaded'}),
    get('/_site/stop', (res, req) => { stop();return 'stopped'}),
    get('/*', notfound)
  ),
})
