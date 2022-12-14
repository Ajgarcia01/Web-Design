const { src, dest } = require("gulp");
var exec = require('child_process').exec;
const git = require('gulp-git');
const sass = require('gulp-dart-sass');
var GulpSSH = require('gulp-ssh')
var fs = require('fs');






//Funcion para descargar todos los datos del repositorio en la carpeta desarrollo.
function clone_repository() {
    return git.clone('https://github.com/JuanFrancisco21/Ejercicio-Gulp.git', { args: 'desarrollo/' }, function (err) {console.log(err) });
}


//Fucion para compilar archivos sass.
function compile_sass() {
    return src('./node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./styles/'));
}

//Fucion para compilar y generar los archivos de sassdoc
function compiles_sass_doc(cb) {
    exec('sassdoc ./desarrollo/styles  -d ./documentacion/sassdoc/', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
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

function pull(){
    return gulpSSH
    .exec(['git pull']);
}


exports.sass = compile_sass;
exports.sass_doc=compiles_sass_doc;
exports.pull = pull;
exports.start=dockerStart;
