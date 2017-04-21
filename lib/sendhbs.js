module.exports = (send, notfound, compiled_files, dir) => {
  return sendhbs = (res, file, data) => {
    if(compiled_files[dir + file]) {
      send(res, 200, compiled_files[dir + file](data))
    } else {
      notfound()
    }
  }
}
