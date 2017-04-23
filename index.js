const micro = require('micro')
const send = micro.send
const { router, get } = require('microrouter')
const fsp = require('fs-promise')
const fs = require('fs')
const hbs = require('handlebars')
const mime = require('mime-types')

const routes = require('./routes.js')
const _site_ = require('./lib/_site.js')
const stylesheet = require('./lib/stylesheet.js')

const sendhbs_ = require('./lib/sendhbs.js')
const _static_ = require('./lib/static.js')
const bundle_ = require('./lib/bundle.js')

hbs.registerHelper('ifeq', function(v1, v2, options) {
  return v1 === v2 ? options.fn(this) : options.inverse(this)
})

// ## options:
const config = {
  dir: './site',
  static_dir: 'static',
  files: [
    'index.hbs', 'about.hbs', 'blog.hbs'
  ],
  port: process.argv[2] || process.env.PORT || 3000,
}

let compiled_files = {}
let posts = []

// #### start fn: loads the the files and saves the data to variables
const start = async(dir) => {
  console.log('start fn call')
  config.files.push('_document.hbs', '_error.hbs')
  config.files.push(...['_site/index.hbs', '_site/pages.hbs', '_site/posts.hbs', '_site/help.hbs', '_site/settings.hbs', '_site/login.hbs', ])
  config.files.push(...['_site/components/nav.hbs'])
  posts = JSON.parse(await fsp.readFile('./posts.json'))
  config.files.forEach(async (file, i) =>
    compiled_files[dir + '/' + file] =
      await hbs.compile(await fsp.readFile(dir + '/' + file, 'utf8')))
}

// #### 404 page
const notfound = async (req, res) => {
  sendhbs(res, '/_error', {
    title: 'error',
    file: '_error',
    global: true,
    error_code: '404',
    error_message: 'page not found',
  }, false)
}

// #### static files
const _static = _static_(send, fsp, mime)
// #### bundle files
const bundle = bundle_(send, fs, mime, config.static_dir)

// #### sending and rendering handlebars (.hbs) files
const sendhbs = sendhbs_(send, notfound, compiled_files, config.dir, stylesheet)





// #### all routes from './routes.js'
const { index, blog, blog_post, about } = routes(send, sendhbs, () => posts)

const _site = _site_(send, sendhbs, () => posts, config)


// ### starting micro programmatically
module.exports = (reload, stop) => ({
  port: config.port,
  start: start.bind(this, config.dir),
  router: router(
    get('/', index),
    get('/index', index),
    get('/blog', blog),
    get('/blog/:id', blog_post),
    get('/about', about),
    get('/' + config.static_dir + '/*', _static),
    get('/_site/reload', (req, res) => _site.reload(req, res, reload)),
    get('/_site/stop', (req, res) => _site.stop(req, res, stop)),
    get('/_site', _site.index),
    get('/_site/', _site.index),
    get('/_site/index', _site.index),
    get('/_site/pages', _site.pages),
    get('/_site/posts', _site.posts),
    get('/_site/help', _site.help),
    get('/_site/settings', _site.settings),
    get('/_site/login', _site.login),
    get('/bundle', bundle),
    get('/*', notfound)
  ),
})
