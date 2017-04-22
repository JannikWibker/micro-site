module.exports = (send, notfound, compiled_files, dir) => {
  return sendhbs = (res, file, data, incl_layout = true) => {
    if(compiled_files[dir + file] && incl_layout) {
        send(res, 200, compiled_files[dir + '/_document.hbs']({
          title: data.title || '',
          file: data.file || '',
          body: compiled_files[dir + file](data),
        }))
    } else if(compiled_files[dir + file] && !incl_layout){
      send(res, 200, compiled_files[dir + file](data))
    } else {
      notfound()
    }
  }
}
