const gaze = require('gaze')
const consola = require('consola').withScope('script')
const { spawn } = require('child_process')

function run({ brk, script, port, watch }) {
  if (watch) {
    observe({ brk, script, port, watch })
  }
  else {
    execute({ brk, script, port })
  }
}

function observe({ brk, script, port, watch }) {
  consola.start(`watching: "${watch}"`)
  let child = execute({ script, port })
  gaze(watch, (err, watcher) => {
    watcher.on('all', (event, filepath) => {
      if (child) {
        child.stdin.pause()
        child.kill()
      }
      child = execute({ script, port })
    })
  })
}

function execute({ brk, script, port }) {
  let cmd = 'node'
  let inspect = brk ? 'inspect-brk' : 'inspect'
  let args = [ `--${inspect}=localhost:${port}`, script ]
  consola.start(`executing: ${cmd} ${args.join(' ')}`)

  env = {}
  endpoint = require('./endpoint').read()
  Object.assign(env, process.env, { MONITEER_WS_ENDPOINT: endpoint })

  const child = spawn('node', args, {
    env,
  })
  child.stdout.on('data', (data) => { console.log(data.toString()) })
  child.stderr.on('data', (data) => { console.log(data.toString()) })
  return child
}

module.exports = { run, execute, observe }
