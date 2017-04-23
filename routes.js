module.exports = (send, sendhbs, posts) => {

  // #### index page
  const index = async (req, res) => {
    sendhbs(res, '/index', {
      title: 'index',
      stylesheet: ['global', 'index'],
      i_am: 'im',
      name: 'Jannik',
      links: [
        { name: 'about', url: '/about' },
        { name: 'blog', url: '/blog' },
        { name: 'code', url: 'http://github.com/JannikWibker'}
      ]})
  }

  // #### blog list page
  const blog = async (req, res) => {
    sendhbs(res, '/blog', {
      title: 'blog',
      stylesheet: ['global', 'blog'],
      posts: posts
    })
  }

  // #### blog post page
  const blog_post = async (req, res) => {
    sendhbs(res, '/blog', {
      title: posts()[req.params.id].name,
      stylesheet: ['global', 'blog'],
      post: posts()[req.params.id]
    })
  }

  // #### about page
  const about = async (req, res) => {
    sendhbs(res, '/about', {
      title: 'about',
      stylesheet: ['global', 'about'],
    })
  }

  return {
    index,
    blog,
    blog_post,
    about,
  }
}
