module.exports = (send, sendhbs, posts) => ({
  index: (req, res) => {
    sendhbs(res, '/_site/index.hbs', {
      file: '_site/index'
    })
  },
  stop: (req, res, stop) => (stop(), 'stopped'), // note: 'stopped' will never be returned
  reload: (req, res, reload) => (reload(), 'reloaded'), // this uses the comma-statement-series operator (,). This operator is awesome.
})
