const data = require('./data')
const axios = require('axios')
let baseUrl = 'http://restapi.amap.com/v3/assistant/coordinate/convert?'
let params = '&coordsys=baidu&output=json&key=67f8c9a99a21bf47709b484308f0979d'
// url需要这样，注意参数顺序 http://restapi.amap.com/v3/assistant/coordinate/convert?locations=116.481499,39.990475|116.481499,39.990475&coordsys=baidu&output=json&key=67f8c9a99a21bf47709b484308f0979d
module.exports = {
  url: '',
  init () {
    let locations = ''
    locations = data.join('|')
    this.url = baseUrl + 'locations=' + locations + params
  },
  convert () {
    let that = this
    that.init()
    axios.get(that.url).then((result) => {
      console.info(result)
      let coordStr = result.data.locations
      let coord = coordStr.split(';')
      coord = coord.map(function (item) {
        return item.split(',').map(function (item) {
          return Number(item)
        })
      })
      console.info(coord)
    }).catch((error) => {
      console.log(error)
    })
  }
}
