var path       = require('path'),
    fs         = require('fs'),
    browserify = require('browserify');

browserify()
  .require(require.resolve('./src/jampie.js'), { entry: true })
  .bundle({ debug: false })
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(path.join(__dirname, 'dist', 'jampie.js')));

console.log('CommonJS bundle generated.');

browserify()
  .require(require.resolve('./src/jampie_global.js'), { entry: true })
  .bundle({ debug: false })
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(path.join(__dirname, 'dist', 'jampie.global.js')));

console.log('Global bundle generated.');
