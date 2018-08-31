const fs = require('fs')
const { root } = require('./utils')
const path = require('path')
const consola = require('consola').withScope('config')

let relativePath = './moniteer.config.js'
let configPath = path.join(root, relativePath)

function defaults() {
  return {
    development: {
      browser: {
        headless: false,
        devtools: true
      }
    },
    production: {
      browser: { }
    }
  }
}

function get(env) {
  if (fs.existsSync(configPath)) {
    config = require(configPath)[env]
    if (config == null) throw new Error(`In ${configPath}, environment ${env} wasn't defined. `)
    consola.info(`using config from ${configPath}, with environment '${env}' `)
    return config
  }
  else return defaults()[env]
}

function init() {
  consola.info(`initializing config at ${configPath}`)
  jsan = JSON.stringify(defaults(), null, 2)
  fs.writeFile(configPath, `module.exports = ${jsan}`, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = { get, init, configPath, defaults }
