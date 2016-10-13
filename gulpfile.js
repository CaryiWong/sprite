/**
 * Created by Administrator on 2016/10/12.
 */
const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
gulp.task('sprite', function () {
    var spriteData = gulp.src('example/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        cssTemplate: 'template/scss.template.handlebars',
        algorithm: 'binary-tree',
        cssFormat: 'scss',
        cssOpts: 'spriteSrc',
        padding: 8,
        cssVarMap: function(sprite) {
            sprite.name = 'icons-' + sprite.name
        }
    }));
    return spriteData.pipe(
        $.if('*.png', gulp.dest('example/images'))
        )
        .pipe(
            $.if('*.css', gulp.dest('example/styles'))
        )
        .pipe(
            $.if('*.scss', gulp.dest('example/styles'))
        );
});

gulp.task('styles', () => {
    return gulp.src('example/styles/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            sourceComments: true,
            outputStyle: 'expanded',
            precision: 10,
            includePaths: [
                '.',
                'example/styles',
                'bower_components/bootstrap-sass/assets/stylesheets',
                'node_modules']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 3 version', 'Android 4']
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('example/css/'))
});

gulp.task('default',['sprite'], () => {
    gulp.start('styles');
});