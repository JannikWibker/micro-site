const { send } = require('micro')
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

let compiled_files = {}
let posts = []

// #### start fn: loads the the files and saves the data to variables
const start = async(dir) => {
  posts = JSON.parse(await fsp.readFile('./posts.json'))
  files.forEach(async (file, i) =>
    compiled_files[dir + '/' + file] =
      await hbs.compile(await fsp.readFile(dir + '/' + file, 'utf8')))
}
// ### start fn()
start(dir)

// #### 404 page
const notfound = async (req, res) => {
  send(res, 404, '404 - page not found')
}

// #### static files
const _static = _static_(send, fsp, mime)

// #### sending and rendering handlebars (.hbs) files
const sendhbs = sendhbs_(send, notfound, compiled_files, dir)

// #### all routes from './routes.js'
const { index, blog, blog_post, about } = routes(send, sendhbs, () => posts)

// ### exporting routes
module.exports = router(
  get('/', index),
  get('/index', index),
  get('/blog', blog),
  get('/blog/:id', blog_post),
  get('/about', about),
  get('/' + static_dir + '/*', _static),
  get('/*', notfound)
)
