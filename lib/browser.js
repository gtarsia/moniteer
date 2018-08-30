const puppeteer = require('puppeteer')
const consola = require('consola').withScope('browser')

async function launch({ env }) {
  consola.start('.')
  let opts = require('./user_config').get(env).browser
  let browser = await puppeteer.launch(opts)
  let endpoint = browser.wsEndpoint()
  require('./endpoint').write(endpoint)
}

module.exports = { launch }
