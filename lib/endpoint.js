const consola = require('consola').withScope('commands')
const { root } = require('./utils')
var fs = require('fs')
var path = require('path')

let tmpPath = path.join(root, './tmp')
let relativePath = './tmp/endpoint.tmp'
let endpointPath = path.join(root, relativePath)

function read() {
  return fs.readFileSync(endpointPath).toString()
}

function write(endpoint) {
  if (!fs.existsSync(tmpPath)){
    fs.mkdirSync(tmpPath)
  }
  fs.writeFile(endpointPath, endpoint, function(err) {
    if (err) {
      console.log(err)
    }
  });
}

module.exports = { read, write, endpointPath }
