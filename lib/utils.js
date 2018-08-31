let path = require('path');
let fs = require('fs');

function getPathArr () {
  var dirname = process.cwd();
  // make sure the path is outside node_modules directory
  var index = dirname.indexOf(path.sep + 'node_modules' + path.sep);
  if (index !== -1) {
    dirname = dirname.slice(0, index);
  }
  return dirname.split(path.sep);
}

let root;
let found = false;
let pathArr = getPathArr();
let arraySlice = Array.prototype.slice;

// find package.json from the inside out
while (pathArr.length > 0) {
  root = pathArr.join(path.sep);
  if (fs.existsSync(path.join(root, 'package.json'))) {
    found = true;
    break;
  }
  pathArr.pop();
}

if (!found) {
  throw new Error('cannot find any package.json file');
}

module.exports = { root }
