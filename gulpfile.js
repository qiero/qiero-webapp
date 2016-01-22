var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var exec = require('child_process').exec

gulp.task('watch', function() {
    gulp.watch('./app/**/*.js', ['browserify']);
    gulp.watch('./app/**/*.html', ['copy-static']);
});

gulp.task('hoodie-start', ['copy-static', 'browserify'],  function() {
  var child = exec('node ./node_modules/hoodie-server/bin/start --www dist --custom-ports 6001,6002,6003');
  child.stdout.on('data', function(data) {
      console.log(data);
  });
  child.stderr.on('data', function(data) {
      console.log(data);
  });
  return child;
});

gulp.task('browserify', function() {
    return browserify('./app/app.js')
        .bundle()
        .pipe(source('qiero-browserified.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-static', function() {
    return gulp.src(['./app/**/*.html'])
        .pipe(gulp.dest('./dist')); 
});

gulp.task('default', ['hoodie-start', 'watch']);