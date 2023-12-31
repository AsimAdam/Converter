var fs = require('fs');
var path = require('path');

const svgDir = path.resolve(__dirname, './svgs');
console.log('svgDir=', svgDir);

function readfile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(svgDir, filename), 'utf8', function (err, data) {
      console.log('svg:', filename.slice(0, filename.lastIndexOf('.')));
      if (err) {
        reject(err);
      }
      resolve({
        [filename.slice(0, filename.lastIndexOf('.'))]: data
          .replace(/\r?\n/g, '')
          .replace(/\s{2,}/g, ' '),
      });
    });
  });
}

function readSvgs() {
  return new Promise((resolve, reject) => {
    fs.readdir(svgDir, function (err, files) {
      if (err) {
        reject(err);
      }
      Promise.all(files.map(filename => readfile(filename)))
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  });
}

readSvgs().then(data => {
  let svgFile =
    'export default ' + JSON.stringify(Object.assign.apply(this, data));
  fs.writeFile(path.resolve(__dirname, './svgs.js'), svgFile, function (err) {
    if (err) {
      throw new Error(err);
    }
  });
});