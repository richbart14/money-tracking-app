//viewTasks.js -> COPIA DEI FILE, per copiare file non vanno installate librerie ma bastano metodi nativi di gulp

//IMPORTO SEMPRE GULP
const gulp = require("gulp");

//DEFINISCO NUOVA TASK che chiamo copyJs
const copyJs = function() {
    const jsIndex = "./src/js/index.js";
    const utilsIndex = "./src/js/utils.js";
    const modelsIndex = "./src/js/models/Wallet.js";
    return gulp.src([jsIndex, utilsIndex, modelsIndex], { base: "./src" }) //gulp.src unico con le tre risorse che vogliamo copiare
        .pipe(gulp.dest("./dist")); //cartella di destinazione, cartella dist
};
//il processo copyJs lo importo nel fine inziale index.js

//ESPORTO FUNZIONE
module.exports = {
    copyJs: copyJs
}