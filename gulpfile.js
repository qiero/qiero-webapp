var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var file = require('gulp-file');
var fs = require('fs');
var uuid = require('uuid');
var Server = require('karma').Server;

/* Does not watch for changes in node_modules! */ 
gulp.task('watch', function() {
    gulp.watch('./app/**/*.html', ['copy-static']);
    gulp.watch('./app/**/*.js', ['copy-static', 'test']);
    gulp.watch('./app/manifest.appcache', ['copy-static']);
});

gulp.task('build', ['copy-static', 'copy-node-modules']);

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('manifest', function() {
    var manifestContent = fs.readFileSync('./app/manifest.appcache', "utf8");
    manifestContent = manifestContent + '\n// Manifest version hash: ' + uuid.v1();
    
    return file('manifest.appcache', manifestContent, { src: true })
            .pipe(gulp.dest('./dist'));
});

gulp.task('hoodie-start', ['copy-static', 'manifest', 'copy-node-modules'],  function() {
  var child = exec('node ./node_modules/hoodie-server/bin/start --www dist --custom-ports 6001,6002,6003');
  child.stdout.on('data', function(data) {
      console.log(data);
  });
  child.stderr.on('data', function(data) {
      console.log(data);
  });
  return child;
});

gulp.task('copy-static', ['manifest'], function() {
    return gulp.src([
        './app/**/*.html',
        './app/**/*.js'
    ]).pipe(gulp.dest('./dist')); 
});

gulp.task('copy-node-modules', function() {
    return gulp.src(['./node_modules/**'])
        .pipe(gulp.dest('./dist/node_modules')); 
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['hoodie-start', 'watch']);
