"use strict";

/* Gulp-HTML-Template */
/*!
* gulpfile.js
*
* © Copyright 2021, Vitalii Tereshchuk https://dotoca.com
* Released under the MIT license
* Github https://github.com/xvoland/Gulp-HTML-Template
*
* Date: May 20, 2021
*/


let project_folder = require("path").basename(__dirname);   // "./dist";
let source_folder  = "./app";

let fs = require('fs');

let path = {
    build: {
        html:  project_folder + "/",
        css:   project_folder + "/css/",
        js:    project_folder + "/js/",
        img:   project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: [source_folder + "/js/**/*.js", "!" + source_folder + "/js/**/_*.js"],
        img: source_folder + "/img/**/*.{jpg, png, svg, gif, ico, webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg, png, svg, gif, ico, webp}",
    }
};

let { src, dest } = require("gulp"),
    gulp  = require("gulp"),
    browsersync = require("browser-sync").create(),
    filesinclude = require("gulp-file-include"),
    del = require("del"),
    sass = require("gulp-dart-sass"),
    minify_inline = require("gulp-minify-inline"),
    autoprefixer = require("gulp-autoprefixer"),
    htmlmin = require("gulp-htmlmin"),
    group_css_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,         // or uglify
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),                        // webp
    webp_html = require("gulp-webp-html-fix"),
    webp_css = require("gulp-webp-css"),
    svg_sprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),                // fonts
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    notify = require("gulp-notify"),
    concat = require("gulp-concat");



/* live Browser */
function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}


/* working with HTML */
function html() {
    return  src(path.src.html)
        .pipe(filesinclude())               // include templates for gulp
        .pipe(minify_inline())              // minifies inline JS and CSS
        .pipe(webp_html())
        .pipe(dest(path.build.html))
        .pipe(htmlmin({                     // compressed version of HTML
            collapseWhitespace: true,
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeEmptyAttributes: true,
            removeEmptyElements: true,
            collapseBooleanAttributes: true
        }))
        .pipe(
            rename({
                extname: ".min.html"
            })
        )
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())         // update live sync
}



/* delete dist folder */
function clean(params) {
    console.log("Clean path: " + path.build.html);
    return del(path.build.html)
}



/* working with CSS */
function css() {
    return  src(path.src.css)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(webp_css())
        .pipe(group_css_media())
        .pipe(autoprefixer({
            overrideBrowserlist: ["last 2 version", "safari 5", "ie 8", "ie 9"],
            cascade: true
            })
        )
        .pipe(dest(path.build.css))         // clean css for dev
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())         // update live sync
}



/* working with JS */
function js() {
    return  src(path.src.js)
        .pipe(filesinclude())               // include templates for gulp
        .pipe(dest(path.build.js))          // leave orig JS
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))          // optimization version of JS
        .pipe(browsersync.stream())         // update live sync
}



/* working with Images */
function images() {
    return  src(path.src.img)
        .pipe(webp({
                quality: 50
            })
        )
        .pipe(dest(path.build.img))             // create webp images
        .pipe(dest(path.src.img))               // return to other images
        .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                optimizationLevel: 3            // from 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())             // update live sync
}


/* working with Fonts */
function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));

    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}


async function css_console() {
  var result = sass.renderSync({
    file: path.src.css,
    outputStyle: "compressed",
    outFile: path.build + "all.css",
  });

  console.log(result.css.toString());
}



/* add fonts from folder to SCSS file */
async function fontsCSS(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');

    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);

        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;

                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];

                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }

                    c_fontname = fontname;
                }
            }
        })
    }
}


function cb() {
}


/* watch */
function watchFiles(param) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}


/* processing of SVG files for create sprite */
gulp.task("svgSprite", function(){
    return gulp.src([source_folder + '/icons/*.svg'])
        .pipe(svg_sprite({
                mode: {
                    sprite: "../icons/icons.svg",           // sprite filename
                    // example: true
                }
            })
        )
        .pipe(gulp.dest(path.build.img))
})


/* processing of OTF to TTF files */
gulp.task("otf2ttf", function(){
    return gulp.src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        })
        .pipe(dest(source_folder + '/fonts/'))
        )
})


// background build
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.default = watch;
exports.watch = watch;
exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.fonts = fonts;
exports.fontsCSS = fontsCSS;

exports.css_console = css_console;
