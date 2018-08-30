const gaze = require('gaze')
const consola = require('consola').withScope('inspector')
const { spawn } = require('child_process')

function run({ watch, port }) {
  if (watch) {
    observe({ watch })
  }
  else {
    execute({ port })
  }
}

function observe({ watch }) {
  consola.start(`watching: "${watch}"`)
}

function execute({ port }) {
  let cmd = 'node'
  let args = [ 'inspect', `localhost:${port}` ]
  consola.start(`executing: ${cmd} ${args.join(' ')}`)
  var ctrlC = false;
  var buffer = '';

  process.stdin.on('data', function (data) {
    data = data.toString();
    buffer += data;
    const chr = data.charCodeAt(0);

    // if restartable, echo back
    if (chr === 3) {
      if (ctrlC) {
        process.exit(0);
      }

      ctrlC = true;
      return;
    } else if (buffer === '.exit' || chr === 4) { // ctrl+d
      process.exit();
    } else if (chr === 13 || chr === 10) { // enter / carriage return
      buffer = '';
    } else if (chr === 12) { // ctrl+l
      console.clear();
      buffer = '';
    }
    ctrlC = false;
  });
  if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
  }
  const child = spawn(cmd, args, {
    stdio: [ 'pipe', process.stdout, process.stderr ]
  })
  process.stdin.resume()
  process.stdin.pipe(child.stdin)
}

module.exports = { run, execute, observe }
