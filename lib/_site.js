module.exports = (send, sendhbs, posts) => ({
  index: (req, res) => {
    sendhbs(res, '/_site/index.hbs', {
      file: '_site/index'
    })
  },
})
