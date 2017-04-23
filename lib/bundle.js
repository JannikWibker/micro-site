// ?bundle=_site%2Findex%3B_site%2Fcomponents%2Fnav&type=css

module.exports = (send, fs, mime, static_dir) =>
    async (req, res) => {
    let type = req.query.type
    let file_name = req.query.bundle.split(';').map(file => static_dir + '/' + file + '.' + type)
    res.setHeader('Content-Type', mime.lookup(req.query.type))
    res.write('')
    let res_text = ''
    let responses = file_name.map(file =>
      new Promise(resolve => fs.readFile('./' + file, 'utf8', (err, data) => {
        if(err) {
          if(err.code === 'ENOENT') console.log('no such file:', err.path)
          else console.log(err)
        }
        res_text += data || ''
        resolve()
      }))
    )
    Promise.all(responses).then(() => res.end(res_text))

  }

/*
  let requests = [1,2,3].map((item) => {
      return new Promise((resolve) => {
        asyncFunction(item, resolve);
      });
  })

  Promise.all(requests).then(() => console.log('done'));
*/
