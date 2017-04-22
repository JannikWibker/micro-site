module.exports = (send, sendhbs, posts) => {

  // #### index page
  const index = async (req, res) => {
    sendhbs(res, '/index.hbs', {
      title: 'index',
      file: 'index',
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
    sendhbs(res, '/blog.hbs', {
      title: 'blog',
      file: 'blog',
      posts: posts
    })
  }

  // #### blog post page
  const blog_post = async (req, res) => {
    sendhbs(res, '/blog.hbs', {
      title: posts()[req.params.id].name,
      file: 'blog',
      post: posts()[req.params.id]
    })
  }

  // #### about page
  const about = async (req, res) => {
    sendhbs(res, '/about.hbs', {
      title: 'about',
      file: 'about',
    })
  }

  return {
    index,
    blog,
    blog_post,
    about,
  }
}
