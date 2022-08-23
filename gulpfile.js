// De esta manera nos traemos funcionalidades de gulp
const {src, dest, watch} = require("gulp");
// src, sirve para determinar la ruta de un archivo
// dest, es una funcion que la empleamos para almacenar algo en una carpeta de estilo
const sass = require("gulp-sass")(require('sass'));


function css(done) {
    
    /*Podemos colocar .pipe() delante de otro .pipe()
    y se ejucataran uno detras del otro */ 
    
    src("src/scss/**/*.scss")// Debemos identificar el archivo de SASS
    .pipe(sass())// Como segundo paso debemos Compilarlo 
    .pipe(dest("build/css")); // Ultimo paso es Almacenarla en el disco duro
    
    done(); // Es un callback que avisa a gulp cuando llegamos al final
}

function dev(done) {
    watch("src/scss/**/*.scss", css);

    done();
};

exports.css = css;
exports.dev = dev;