var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var jshint      = require('gulp-jshint');
var concatJs    = require('gulp-concat');
var notify      = require("gulp-notify");
var uglify      = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');
var jsOut       = 'src/js/components/*.js';
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var FAVICON_DATA_FILE = 'faviconData.json';
//var imageop = require('gulp-image-optimization');
var concat   = require('gulp-concat');
// insira a url do site
var urlSite = "http://localhost/projetos/island"
var urlDeploy = "https://www.teste.com.br"
// insira o nome do tema
var themeName = "larambiental"

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.{otf,ttf,woff,woff2}')
    .pipe(font2css())
    .pipe(concat('fonts.css'))
    .pipe(gulp.dest('src/sass/includes'))
})

gulp.task('images', function(cb) {
    gulp.src(['src/'+themeName+'/*.png','src/'+themeName+'/*.jpg','src/'+themeName+'/*.gif','src/'+themeName+'/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('sem-tiny')).on('end', cb).on('error', cb);
});

gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'src/favicon/logo.png',
    dest: 'favicon/images',
    iconsPath: urlSite+'/wp-content/themes/'+themeName+'/favicon/images',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#fff',
        margin: '14%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#fff',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#fff',
        manifest: {
          name: 'projeto Dev',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#fff'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
});

gulp.task('sass', function() {
    return gulp.src("src/sass/**/**/*.scss")
        .pipe( sass({
            outputStyle: 'compressed' // use 'compressed' para minificar o css
        }) )
        .on('error', sass.logError)
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream())
        .pipe(notify({ message: "Css gerado!", onLast: true }));
});

// gulp.task('js', function() {
//     gulp.src(jsOut)
//         .pipe(uglify().on('error', function(e){
//             console.log(e);
//          }))
//         .pipe(concatJs('script.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('build/js'))
//         .pipe(notify({ message: "Js gerado!", onLast: true }));
// });

gulp.task('js', function() {
 return gulp.src('src/js/**/**/*.js')
   //.pipe(concat('script.js'))
   .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function() {
    gulp.watch(["src/sass/**/**/*.scss"], ['sass']);
    gulp.watch([jsOut], ['js']).on('change', browserSync.reload);
    gulp.watch(["*.php", "*.html"]).on('change', browserSync.reload);
});

gulp.task('sprite-generator', function generateSpritesheets () {
  var spriteData = gulp.src('src/icons-sprite/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: urlSite+'/wp-content/themes/'+themeName+'/src/images/sprite.png',
      cssName: '_sprite.scss'
    }));

  spriteData.img.pipe(gulp.dest('./src/images'));
  spriteData.css.pipe(gulp.dest('./src/sass/components'));
});

gulp.task('deploy', function generateSpritesheets () {
  var spriteData = gulp.src('src/icons-sprite/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: urlDeploy+'/wp-content/themes/'+themeName+'/src/images/sprite.png',
      cssName: '_sprite.scss'
    }));

  spriteData.img.pipe(gulp.dest('./src/images'));
  spriteData.css.pipe(gulp.dest('./src/sass/components'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: urlSite,
        notify: true
    });
});

gulp.task('default', ['sass', 'js', 'watch', 'browser-sync']);
