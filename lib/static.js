module.exports = (send, fsp, mime) => {
  return _static = async (req, res) => {
    res.setHeader('Content-Type', mime.lookup(req.url))
    send(res, 200, await fsp.readFile('.' + req.url, 'utf8'))
  }
}
