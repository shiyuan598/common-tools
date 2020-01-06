let WKT = require('terraformer-wkt-parser')
let wellknown = require('wellknown')

let wktStr = 'LINESTRING (30 10, 10 30, 40 40)'
let geojson = WKT.parse(wktStr)
console.info(geojson)
geojson = wellknown.parse(wktStr)
console.info(geojson)

let geom = {
  type: 'Polygon',
  coordinates: [
    [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
    [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
  ]
}
let polygon = WKT.convert(geom)
console.info(polygon)
polygon = wellknown.stringify(geom)
console.info(polygon)
