module.exports = (send, sendhbs, posts) => ({
  index: (req, res) => {
    sendhbs(res, '/_site/index.hbs', {
      file: '_site/index'
    })
  },
  stop: (req, res, stop) => {
    stop()
    return 'stopped' // this code will never be executed but I still have it here;
  },
  reload: (req, res, reload) => {
    reload()
    return 'reloaded'
  },
})
