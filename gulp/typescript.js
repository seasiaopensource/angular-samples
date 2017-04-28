var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require("gulp-tslint");
var path = require('path');
var conf = require('./conf');
var browserSync = require('browser-sync');

gulp.task('tslint', function () {
    return gulp.src(path.join(conf.paths.src, '/app/**/*.ts'))
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
});

gulp.task('typescripts-reload', function () {
    return buildScripts(false)
        .pipe(browserSync.stream());
});

gulp.task('typescripts', function () {
    return buildScripts(false);
});

gulp.task('compile', function () {
    return buildScripts(false);
});

gulp.task('typescripts:test', function () {
    return buildScripts(true);
});

function buildScripts(forTest) {
    gulp.start('tslint');
    var src = [
        path.join(conf.paths.typings, '/**/*.d.ts')
    ];
    if(forTest){
        src = src.concat([
            path.join(conf.paths.src, '/app/**/*.spec.ts'),
            path.join(conf.paths.src, '/app/**/*.mock.ts'),
            path.join(conf.paths.src, '/app/**/*.ts')
        ]);
    } else {
        src = src.concat([
            path.join('!' + conf.paths.src, '/app/**/*.spec.ts'),
            path.join('!' + conf.paths.src, '/app/**/*.mock.ts'),
            path.join(conf.paths.src, '/app/**/*.ts')
        ]);
    }
    return gulp.src(src)
        .pipe(ts({
          module:'commonjs',
          target: 'es5'
        }))
        .js
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/scripts')));
}
