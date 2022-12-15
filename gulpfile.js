const { src, dest } = require("gulp");
var exec = require('child_process').exec;
const sass = require('gulp-dart-sass');
var GulpSSH = require('gulp-ssh')
var fs = require('fs');
const sassdoc = require("sassdoc");


//Fucion para compilar archivos sass.
function compile_sass() {
    return src('./node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./styles/'));
}


//Fucion para compilar y generar los archivos de sassdoc
function compiles_sass_doc(cb) {
     exec('sassdoc ./node_modules/bootstrap/scss/');
     cb();
}

//Funciones para subir archivos via ssh a AWS 
var config = {
  host: "jgarluq1102.duckdns.org",
  port: "22",
  username: "ec2-user",
  privateKey: fs.readFileSync('C:\\Users\\JGL\\Downloads\\cla.pem')
}
 
var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
})

function dockerStart(){
    return gulpSSH
    .exec(['docker start webdesign']);
}


exports.sass = compile_sass;
exports.sass_doc=compiles_sass_doc;
exports.start=dockerStart;
