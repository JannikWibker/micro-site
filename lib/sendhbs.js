module.exports = (send, notfound, compiled_files, dir, stylesheet) => {
  return sendhbs = (res, file, data, layout = true, components = {}) => {
    if(compiled_files[dir + file + '.hbs']) {

      let comp_keys = Object.keys(components)
      let obj = {}
      comp_keys.forEach(key => obj[key] = compiled_files[(dir + components[key]) + '.hbs'](data[key]))
      let component_hbs = compiled_files[dir + file + '.hbs'](Object.assign(data, obj))

      if(layout) {
        send(res, 200, compiled_files[dir + '/_document.hbs']({
          title: data.title || '',
          file: data.file || '',
          global: data.global || false,
          stylesheet: data.stylesheet ? stylesheet(data.stylesheet) : '',
          body: component_hbs
        }))
      } else {
        send(res, 200, component_hbs)
      }
    } else {
      notfound()
    }
  }
}

// let obj = {}
// Object.keys(components).forEach(key => {
//   console.log(components[key], key);
//   obj[key] = compiled_files[(dir + components[key])](data.key)
// })
// send(res, 200, compiled_files[dir + file](Object.assign(data, obj)))
