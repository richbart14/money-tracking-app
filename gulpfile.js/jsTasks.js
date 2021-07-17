//viewTasks.js -> COPIA DEI FILE, per copiare file non vanno installate librerie ma bastano metodi nativi di gulp

//IMPORTO SEMPRE GULP
const gulp = require("gulp");
//IMPORTO BROWSERIFY
/*bundler, permette connessioni tra file, gestire connessioni tra i moduli attaverso i file javascript attraverso parole
    chiave utilizzate all'interno dei file per esportare-importare moduli (module.exports-require), 
    il bundler li analizza e crea il suo albero creando le connessioni*/
/*npm i browserify -D
  npm i vynil-source-stream vinyl-buffer -D  (sono altre 2 librerie che ci permetterano di gestire il flusso di dati all'interno di BROWSERIFY)*/
const browserify = require("browserify");
const source = require("vinyl-source-stream"); //ci permette di effettuare l'output all'interno di un unico file javascript in uscita che sarà uguale all'entry
const buffer = require("vinyl-buffer"); //ci permette di getire buffer dei dati e di inviarlo al successivo pipe

const paths = require("./paths"); //IMPORTO PATHS che è il file dove gestisco i percorsi dell'applicazione

//DEFINISCO NUOVA TASK che chiamo copyJs
const bundleJS = function() {
    //const jsIndex = "./src/js/index.js";
    // const jsIndex = paths.getJsEntryPath();    //UTILIZZO PERCORSI GENERATI CON PATH E NON LA STRINGA
    //const utilsIndex = "./src/js/utils.js";
    // const utilsIndex = paths.getJsSrcPath("/utils.js");
    //const modelsIndex = "./src/js/models/Wallet.js";
    // const modelsIndex = paths.getJsSrcPath("/models/Wallet.js");
   
    //RIMPIAZZO GULP SOURCE CON BUFFER DI DATI BROWSERIFY
    return browserifyBundle() //funzione che avvia processo di bundling
    //return gulp.src([jsIndex, utilsIndex, modelsIndex], { base: paths.getSrcFolder() /* "./src" */ }) //base folder
           //gulp.src unico con le tre risorse che vogliamo copiare
        //.pipe(gulp.dest("./dist")); //cartella di destinazione, cartella dist
        .pipe(gulp.dest(paths.getJSOutputPath())); 
        //i nostri file js devono essere all'interno della cartella javascript
};
//il processo copyJs lo importo nel file inziale index.js

//BROWSERIFY: CREO PROCESSO DI BUNDLING ALL'INTERNO DEL PROCESSO DI GULP
const browserifyBundle = function() {
    //funzione che restituisce un buffer di dati proveniente dal metodo browserify
    return browserify({ //ritorno metodo browserify
        entries: paths.getJsEntryPath()  /* js/index.js punto d'entrata della nostra applicazione, come se fosse radice 
                                        di un albero e dalla radice di quest'albero ripercorriamo tutti i suoi rami,
                                        ovvero tutte le dipendenze che sono collegate man mano l'una con l'altra*/
    })
        .bundle() //metodo BUNDLE ci permetterà di ricreare le connessioni tra i file, inizia ricostruzione delle connessioni
        .pipe(source(paths.getJSOutputEntry()))  //source è libreria vinyl-source-stream
        .pipe(buffer()); //buffer è la libreria vinyl-buffer
        //questo buffer di dati va utilizzato per inserire questo file finale in una cartella di destinazione
        //LO INSERISCO NELLA FUNZIONE bundleJs
}

//DEFINISCO NUOVO TASK WATCHER DEI FILE JS, CONTROLLO MODIFICHE FILE
const watchJs = function(cb) {
    gulp.watch(paths.getJsSrcPath("**/*"), bundleJS);  // **/* tutti i file cartella principale e sottocartelle, dato che abbiamo anche models
                                //così starà attento a qualsiasi cambiamento all'interno dell'intera cartella e sottocartelle di js
    //una volta effettuato il gulp.watch serve funzione di callback che è copyJs/bundleJS, ovvero cosa chiamare quando effettuiamo gulp.watch
    cb(); //calback che serve per terminare processo di watching nel terminale e passare ad altro processo che altrimenti rimane in starting 'watchJs'...
};
//il processo copyJs lo importo nel file inziale index.js

//ESPORTO FUNZIONI
module.exports = {
    bundleJS: bundleJS,
    watchJs: watchJs
}