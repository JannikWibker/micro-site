let pages = [
  {name: 'index', url: 'index'},
  {name: 'pages', url: 'pages'},
  {name: 'posts', url: 'posts'},
  {name: 'help', url: 'help'},
  {name: 'settings', url: 'settings'},
]

let comp = {
  nav: '/_site/components/nav',
}

module.exports = (send, sendhbs, posts, config) => ({
  index: (req, res) => {
    sendhbs(res, '/_site/index', {
      stylesheet: ['global', '_site/components/nav', '_site/global', '_site/index'],
      page: 'index', _config: JSON.stringify(config, 2, 2), config: config,
      nav: { pages: pages, active: 'index' },
    }, true, comp)
  },
  pages: (req, res) => {
    sendhbs(res, '/_site/pages', {
      stylesheet: ['global', '_site/components/nav', '_site/global', '_site/pages'],
      page: 'pages',
      nav: { pages: pages, active: 'pages'},
    }, true, comp)
  },
  posts: (req, res) => {
    sendhbs(res, '/_site/posts', {
      stylesheet: ['global', '_site/components/nav', '_site/global', '_site/posts'],
      page: 'posts',
      nav: { pages: pages, active: 'posts' },
    }, true, comp)
  },
  help: (req, res) => {
    sendhbs(res, '/_site/help', {
      stylesheet: ['global', '_site/components/nav', '_site/global', '_site/help'],
      page: 'help',
      nav: { pages: pages, active: 'help' },
    }, true, comp)
  },
  settings: (req, res) => {
    sendhbs(res, '/_site/settings', {
      stylesheet: ['global', '_site/components/nav', '_site/global', '_site/settings'],
      page: 'settings',
      nav: { pages: pages, active: 'settings' },
    }, true, comp)
  },
  login: (req, res) => {

  },
  stop: (req, res, stop) => (stop(), 'stopped'), // note: 'stopped' will never be returned
  reload: (req, res, reload) => (reload(), 'reloaded'), // this uses the comma-statement-series operator (,). This operator is awesome.
})
