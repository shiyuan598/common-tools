let images = require('images')
let fs = require('fs')

let path = 'E:\\overview'
let outPath = 'E:\\overview\\min'

function  campressImage(path, outPath){
  fs.readdir(path, function(err, files) {
    if (!err) {
      console.info(files)
      files.forEach(file => {
        if (file.indexOf('.jpg') > -1) {
          let name = path + '/' + file
          let outName = outPath + '/' + file
          images(name).save(outName, {
            quality: 20
          })
        }
      })
    }
  })
}

campressImage(path, outPath)