// De esta manera nos traemos funcionalidades de gulp
const {src, dest, watch, parallel} = require("gulp");
// src, sirve para determinar la ruta de un archivo
// dest, es una funcion que la empleamos para almacenar algo en una carpeta de estilo

// SCSS & CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

// IMAGENES;
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");



function css(done) {
    
    /*Podemos colocar .pipe() delante de otro .pipe()
    y se ejucataran uno detras del otro */ 
    
    src("src/scss/**/*.scss")// Debemos identificar el archivo de SASS
    .pipe(plumber()) //evita que se pare la ejecucion de la compilacion
    .pipe(sass())// Como segundo paso debemos Compilarlo 
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

function javaScript(done){
    src("src/js/**/*.js")
        .pipe(dest("build/js"))

    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/*.js", javaScript);

    done();
};

exports.css = css;
exports.javaScript = javaScript;
exports.imagenes = imagenes ;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javaScript, dev );