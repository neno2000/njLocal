var gulp = require('gulp');
var run = require('gulp-run');
var shell = require('gulp-shell');



// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('njLocal',
    function() {
        return run('start npm start').exec();
    });
gulp.task('mv-to-react',
    function() {
        return run('cd client').exec();
    });

gulp.task('start-react',
    function() {
        return run('start npm start').exec() // Start the server.
            .pipe(gulp.dest('output'));
    });

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['njLocal']);
gulp.task('react-dev', ['mv-to-react' ]);
