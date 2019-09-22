let axios = require('axios')
let turf = require('@turf/turf')
let fs = require('fs')
let geobuf = require('geobuf')
let Pbf = require('pbf')
function encodeData (url, outGeoJSON, outGeoBuf) {
    axios.get(url).then((function (res) {
        let arr = (res.data.data)
        let features = []
        arr.forEach(item => {
            let feature = turf.point([item[0], item[1]], {'angle': item[2]})
            features.push(feature)
        })
        let featureCollection = turf.featureCollection(features)
        fs.writeFile(outGeoJSON, JSON.stringify(featureCollection), function(error){
            if(error){
                console.info('geojson error')
            }else {
                console.info('geojson ok')
            }
        })

        let buffer = geobuf.encode(featureCollection, new Pbf())
        console.info(buffer)
        fs.writeFile(outGeoBuf, buffer, function(error){
            if(error){
                console.info('geobuf error')
            }else {
                console.info('geobuf ok')
            }
        })
        console.info()
    }))
}

function decodeData(url) {
    axios.get(url, {
        responseType: 'arraybuffer' // note: responseType must be 'arraybuffer'
    }).then((function (res) {
        let data = res.data
        let geojson = geobuf.decode(new Pbf(data))
        console.info(JSON.stringify(geojson))
    }))
}

let url = 'http://localhost:9004/data/lamp.min.json'
let  outGeoJSON = './data/lamp.geojson.json'
let  outGeoBuf = './data/lamp.geobuf.bpf'
encodeData(url, outGeoJSON, outGeoBuf)

url = 'http://localhost:9004/data/lamp.geobuf.bpf'
decodeData(url)
