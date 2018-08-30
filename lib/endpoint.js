const consola = require('consola').withScope('commands')
var fs = require('fs')
var appRoot = require('app-root-path').toString();
var path = require('path')

let relativePath = './tmp/endpoint.tmp'
let endpointPath = path.join(appRoot, relativePath)

function read() {
  return fs.readFileSync(endpointPath).toString()
}

function write(endpoint) {
  fs.writeFile(endpointPath, endpoint, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = { read, write, endpointPath }