var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream')
var exec = require('child_process').exec;
var del = require('del');
var file = require('gulp-file');
var fs = require('fs');
var uuid = require('uuid');

gulp.task('watch', function() {
    gulp.watch('./app/**/*.html', ['copy-static']);
    gulp.watch('./app/**/*.js', ['browserify']);
    gulp.watch('./app/manifest.appcache', ['copy-static']);
});

gulp.task('browserify', ['manifest'], function() {
    return browserify('./app/app.js')
        .bundle()
        .pipe(source('qiero-webapp.js'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', ['copy-static', 'browserify']);

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('manifest', function() {
    var manifestContent = fs.readFileSync('./app/manifest.appcache', "utf8");
    manifestContent = manifestContent + '\n// Manifest version hash: ' + uuid.v1();
    
    return file('manifest.appcache', manifestContent, { src: true })
            .pipe(gulp.dest('./dist'));
});

gulp.task('hoodie-start', ['build'],  function() {
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
        './app/**/*.html'
    ]).pipe(gulp.dest('./dist')); 
});

gulp.task('default', ['hoodie-start', 'watch']);
