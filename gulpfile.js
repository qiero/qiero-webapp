var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('watch', function() {
    gulp.watch('./app/**/*.html', ['copy-static']);
    gulp.watch('./app/**/*.js', ['copy-static']);
    gulp.watch('./app/manifest.appcache', ['copy-static']);
});

gulp.task('hoodie-start', ['copy-static', 'copy-node-modules'],  function() {
  var child = exec('node ./node_modules/hoodie-server/bin/start --www dist --custom-ports 6001,6002,6003');
  child.stdout.on('data', function(data) {
      console.log(data);
  });
  child.stderr.on('data', function(data) {
      console.log(data);
  });
  return child;
});

gulp.task('copy-static', function() {
    return gulp.src([
        './app/**/*.html',
        './app/**/*.js',
        './app/manifest.appcache'
    ]).pipe(gulp.dest('./dist')); 
});

gulp.task('copy-node-modules', function() {
    return gulp.src(['./node_modules/**'])
        .pipe(gulp.dest('./dist/node_modules')); 
});

gulp.task('default', ['hoodie-start', 'watch']);