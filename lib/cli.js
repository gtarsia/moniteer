#!/usr/bin/env node

var yargs = require("yargs");

async function run() {
  var argv = yargs
    .command('$0 [args]', '', (yargs) => {
      yargs.example('$0 --browser &', 'Launches chromium in the background.')
      yargs.example('$0 --script ./index.js --inspect --watch', 'Runs and inspects a given script that hopefully connects to our browser. Reloads if files in current directory change.')
      yargs.example('$0 --script ./index.js', 'Runs ready-to-inspect (localhost:<port>) script.')
      yargs.example('$0 --inspect', 'Inspects a process running on localhost:<port>.')
    }, (argv) => {
    })
    .options({
      'browser': {
        alias: 'b',
        desc: `Start puppeteer's chromium.
               Calls function 'puppeteer.launch(opts)'.

               Default opts depend on the environment:
               * development: { headless: false, devtools: true }
               * production: { }

               To override these opts, create a 'moniteer.config.js' file in the root of the current package.
               Read --init command to check this file.

               The ws endpoint of chromium is stored flat in ./tmp/endpoint relative to the root of the current package.
              `,
        requiresArg: ''
      },
      'script': {
        alias: 's',
        requiresArg: true,
        desc: `Runs a given script open to debugging with MONITEER_WS_ENDPOINT environment variable.
               Executes command 'node --inspect=localhost:<port> <script> -- MONITEER_WS_ENDPOINT=<endpoint>'.

               Is it expected that the provided script (or any file required by it) runs the following:
               - puppeteer.connect(browserWSEndpoint: program.env.MONITEER_WS_ENDPOINT)

               The endpoint is retrieved from ./tmp/endpoint (check browser opt).
        `
      },
      'inspect': {
        alias: 'i',
        desc: `Create a CLI debugger and connect it to localhost:<port>.
               Executes command 'node inspect localhost:<port>' (runs the CLI debugger).
              `,
      },
      'brk': {
        desc: `When using script option, use --inspect-brk if true.`,
        type: 'boolean',
        implies: 'script'
      },
      'watch': {
        alias: 'w',
        desc: `Watches the specified file or directory.
               If a change is triggered, 'script' and 'inspect' processes are restarted (if any of them were running).
               Value defaults to current directory.
        `
      },
      'port': {
        alias: 'p',
        desc: 'Port used by node-inspect. ',
        default: 9229
      },
      'environment': {
        alias: [ 'e', 'env' ],
        desc: 'Environment of execution. ',
        default: 'development',
        choices: [ 'development', 'production' ]
      },
      'init': {
        desc: 'Creates moniteer.config.js example. '
      },
    })
    .wrap(yargs.terminalWidth())
    .help("h")
    .alias("h", "help")
    .version()
    .argv

  require('./commands').handle(argv)
}

run()
