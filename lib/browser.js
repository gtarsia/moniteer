var puppeteer = require('puppeteer')

export default async function() {
  let browser = await puppeteer.launch({headless: false, devtools: true})
  let endpoint = browser.wsEndpoint()
  return endpoint;
}
