const consola = require('consola').withScope('commands')

function handle(argv) {
  if (argv.browser) {
    browser(argv)
  }
  if (argv.script) {
    script(argv)
  }
  if (argv.inspect) {
    inspect(argv)
  }
  if (argv.init) {
    init(argv)
  }
}

function browser(argv) {
  require('./browser').launch(argv)
}

function script(argv) {
  require('./script').run(argv)
}

function inspect(argv) {
  require('./inspect').run(argv)
}

function init(argv) {
  require('./user_config').init(argv)
}

module.exports = { handle, browser, script, inspect, init }
