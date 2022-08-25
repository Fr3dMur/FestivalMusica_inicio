// De esta manera nos traemos funcionalidades de gulp
const {src, dest, watch, parallel} = require("gulp");
// src, sirve para determinar la ruta de un archivo
// dest, es una funcion que la empleamos para almacenar algo en una carpeta de estilo

// SCSS & CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");



// IMAGENES;
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// JavaScript
const terser = require( 'gulp-terser-js');


function css(done) {
    
    /*Podemos colocar .pipe() delante de otro .pipe()
    y se ejucataran uno detras del otro */ 
    
    src("src/scss/**/*.scss")// Debemos identificar el archivo de SASS
    .pipe(sourcemaps.init())
    .pipe(plumber()) //evita que se pare la ejecucion de la compilacion
    .pipe(sass())// Como segundo paso debemos Compilarlo 
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")); // Ultimo paso es Almacenarla en el disco duro
    
    done(); // Es un callback que avisa a gulp cuando llegamos al final
};

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src( "src/img/**/*.{png,jpg}" )
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )


    done();
};

function versionWebp( done){

    const options = {
        quality: 50
    }
    
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(options))
        .pipe(dest("build/img"))


    done();

};
function versionAvif( done){

    const options = {
        quality: 50
    }
    
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(options))
        .pipe(dest("build/img"))


    done();

};

function javascript(done){
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write())
        .pipe(dest("build/js"))

    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/*.js", javascript);

    done();
};

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes ;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev ) ;

