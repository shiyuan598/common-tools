let axios = require('axios')
let turf = require('@turf/turf')
let fs = require('fs')
let geobuf = require('geobuf')
let Pbf = require('pbf')
function encodeData (url) {
    axios.get(url).then((function (res) {
        let arr = (res.data.data)
        let features = []
        arr.forEach(item => {
            let feature = turf.point([item[0], item[1]], {'angle': item[2]})
            features.push(feature)
        })
        let featureCollection = turf.featureCollection(features)
        fs.writeFile('./data/features.json', JSON.stringify(featureCollection), function(error){
            if(error){
                console.info('error')
            }else {
                console.info('ok')
            }
        })

        let buffer = geobuf.encode(featureCollection, new Pbf())
        console.info(buffer)
        fs.writeFile('./data/geobuf.pbf', buffer, function(error){
            if(error){
                console.info('error')
            }else {
                console.info('ok')
            }
        })
        console.info()
    }))
}

function decodeData(url) {
    axios.get(url, {
        responseType: 'arraybuffer'
    }).then((function (res) {
        let data = res.data
        let geojson = geobuf.decode(new Pbf(data))
        // console.info(geojson)
        console.info(JSON.stringify(geojson))
    }))
}

let url = 'http://localhost:9004/data/lamp.min.json'
encodeData(url)

url = 'http://localhost:9004/data/geobuf.pbf'
decodeData(url)
