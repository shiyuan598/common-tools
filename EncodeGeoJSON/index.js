let axios = require('axios')
let turf = require('@turf/turf')
let fs = require('fs')
let geobuf = require('geobuf')
let Pbf = require('pbf')

function reduceData(url, outJSON) {
    axios.get(url).then((function (res) {
        let arr = (res.data.data)
        let data = []
        let scale = 1000000
        let xBase = 103800000
        let yBase = 1300000
        arr.forEach(item => {
            data.push([item[0].toFixed(6) * scale - xBase, item[1].toFixed(6) * scale - yBase, item[2]])
        })
        let reduceData = {
            xBase: xBase,
            yBase: yBase,
            scale: scale,
            data: data
        }
        fs.writeFile(outJSON, JSON.stringify(reduceData), function (error) {
            if (error) {
                console.info('reduceData error')
            } else {
                console.info('reduceData ok')
            }
        })
    }))
}

function encodeData (url, outGeoJSON, outGeoBuf) {
    axios.get(url).then((function (res) {
        let arr = (res.data.data)
        let features = []
        arr.forEach(item => {
            let feature = turf.point([Number(item[0].toFixed(6)), Number(item[1].toFixed(6))], {'angle': item[2]})
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

let url = 'http://localhost:9001/data/sign.min.json'
let  outGeoJSON = './data/lamp.geojson.min.json'
let  outGeoBuf = './data/lamp.geobuf.min.bpf'
// encodeData(url, outGeoJSON, outGeoBuf)

let outJSON = './data/sign.reduce.min.json'
reduceData(url, outJSON)

url = 'http://localhost:9001/data/lamp.geobuf.bpf'
// decodeData(url)


function getSina(url) {
    axios.get(url, {
        responseType: 'arraybuffer' // note: responseType must be 'arraybuffer'
    }).then((function (res) {
        let data = res.data
        let geojson = geobuf.decode(new Pbf(data))
        console.info(JSON.stringify(geojson))
    }))
}