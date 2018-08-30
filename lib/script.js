const gaze = require('gaze')
const consola = require('consola').withScope('script')
const { spawn } = require('child_process')

function run({ watch, port, script }) {
  if (watch) {
    observe({ watch })
  }
  else {
    execute({ script, port })
  }
}

function observe({ watch }) {
  consola.start(`watching: "${watch}"`)
}

function execute({ script, port }) {
  let cmd = 'node'
  let args = [`--inspect-brk=localhost:${port}`, script]
  consola.start(`executing: ${cmd} ${args.join(' ')}`)

  env = {}
  endpoint = require('./endpoint').read()
  Object.assign(env, process.env, { MONITEER_WS_ENDPOINT: endpoint })

  const child = spawn('node', args, {
    env,
  })
  child.stdout.on('data', (data) => { console.log(data.toString()) })
  child.stderr.on('data', (data) => { console.log(data.toString()) })
}

module.exports = { run, execute, observe }
