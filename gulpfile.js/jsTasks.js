//viewTasks.js -> COPIA DEI FILE, per copiare file non vanno installate librerie ma bastano metodi nativi di gulp

//IMPORTO SEMPRE GULP
const gulp = require("gulp");

const paths = require("./paths"); //IMPORTO PATHS che è il file dove gestisco i percorsi dell'applicazione

//DEFINISCO NUOVA TASK che chiamo copyJs
const copyJs = function() {
    //const jsIndex = "./src/js/index.js";
    const jsIndex = paths.getJsEntryPath();    //UTILIZZO PERCORSI GENERATI CON PATH E NON LA STRINGA
    //const utilsIndex = "./src/js/utils.js";
    const utilsIndex = paths.getJsSrcPath("/utils.js");
    //const modelsIndex = "./src/js/models/Wallet.js";
    const modelsIndex = paths.getJsSrcPath("/models/Wallet.js");
    return gulp.src([jsIndex, utilsIndex, modelsIndex], { base: paths.getSrcFolder() /* "./src" */ }) 
           //gulp.src unico con le tre risorse che vogliamo copiare
        //.pipe(gulp.dest("./dist")); //cartella di destinazione, cartella dist
        .pipe(gulp.dest(paths.getDistFolder())); 
};
//il processo copyJs lo importo nel file inziale index.js

//DEFINISCO NUOVO TASK WATCHER DEI FILE JS, CONTROLLO MODIFICHE FILE
const watchJs = function(cb) {
    gulp.watch(paths.getJsSrcPath("/**/*"), copyJs);  // **/* tutti i file cartella principale e sottocartelle, dato che abbiamo anche models
                                //così starà attento a qualsiasi cambiamento all'interno dell'intera cartella e sottocartelle di js
    //una volta effettuato il gulp.watch serve funzione di callback che è copyJs, ovvero cosa chiamare quando effettuiamo gulp.watch
    cb(); //calback che serve per terminare processo di watching nel terminale e passare ad altro processo che altrimenti rimane in starting 'watchJs'...
};
//il processo copyJs lo importo nel file inziale index.js

//ESPORTO FUNZIONI
module.exports = {
    copyJs: copyJs,
    watchJs: watchJs
}