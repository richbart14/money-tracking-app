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

/*IMPLEMENTO MODALITà DI PRODUZIONE A MODALITà DI SVILUPPO, modalità produzione sarà un bundle MINIFICATO e OFFUSCATO (con uglify)
Aggiungo nel package.json gulp build con parametro --dev o --prod (dev e prod sono i parametri) NPM RUN PROD - NPM RUN DEV
Utilizzo un singolo SERIES per tutte e due le modalità di sviluppo della nostra BUILD, e per questo utilizzo dei parametri per indicare
al processo di build se sarà di sviluppo o di produzione.
INSTALLO E IMPORTO LE LIBRERIE:  npm i gulp-uglify yargs gulp-if -D*/
const gulpIf = require("gulp-if"); //libreria che ci permette di creare la condizione
const uglify = require("gulp-uglify"); //libreria per minificare e offuscare il codice
const args = require("yargs").argv; //libreria che ci permette di leggere i parametri che vengono passati nella linea di comando
                                    //.argv è la variabile in cui vengono inseriti i comandi, ovvero i paramtri che passo dev o prod
/*AGGIUNGO MODALITà DEBUG, installo e importo libreria SOURCEMAPS
npm i gulp-sourcemaps
Aggiungo "prod:debug": "npm run prod -- --debug" nel package.json
debug -> nuova modalità che ci permetterà di utilizzare modalità di produzione però come se stessimo sviluppando, nel senso che
il codice finale sarà sempre offuscato ma attraverso i file aggiuntvi chiamati sourcemaps potremmo comunque leggere quel file
offuscato come se fosse un file non offuscato. I file .map che vengono generati attraverso il sourcemaps ci permettono di 
effettuare un debugging vero e proprio di una eventuale versione di produzione della piattaforma.*/
const sourcemaps = require("gulp-sourcemaps");

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
        .pipe(gulp.dest(paths.getJSOutputPath())); //i nostri file js devono essere all'interno della cartella javascript(vedi JSOutputPath)      
};
//il processo copyJs lo importo nel file iniziale index.js

//BROWSERIFY: CREO PROCESSO DI BUNDLING ALL'INTERNO DEL PROCESSO DI GULP
const browserifyBundle = function() {
    //funzione che restituisce un buffer di dati proveniente dal metodo browserify
    const prod = args.prod; //VARIABILE PER LEGGERE IL PARAMETRO SE BUILD DI PRODUZIONE O SVILUPPO
    const debug = args.debug; //variabile per leggere parametro DEBUG  npm run prod:debug (vedi package.json)
    return browserify({ //ritorno metodo browserify
        entries: paths.getJsEntryPath()  /* js/index.js punto d'entrata della nostra applicazione, come se fosse radice 
                                        di un albero e dalla radice di quest'albero ripercorriamo tutti i suoi rami,
                                        ovvero tutte le dipendenze che sono collegate man mano l'una con l'altra*/
    })
        .bundle() //metodo BUNDLE ci permetterà di ricreare le connessioni tra i file, inizia ricostruzione delle connessioni
        .pipe(source(paths.getJSOutputEntry()))  //source è libreria vinyl-source-stream
        .pipe(buffer()) //buffer è la libreria vinyl-buffer
        //questo buffer di dati va utilizzato per inserire questo file finale in una cartella di destinazione
        //LO INSERISCO NELLA FUNZIONE bundleJs
        .pipe(gulpIf(debug, sourcemaps.init())) //SOURCEMAPS (MODALITà DEBUG) CI INTERESSA SOLO SE IN MODALITà DI DEBUG
        .pipe(gulpIf(prod, uglify())) //inserisco condizione che legge parametro da variabile prod
        //effettuerà offuscamento del codice solo quando build è di produzione
        .pipe(gulpIf(debug, sourcemaps.write("./"))); //SOURCEMAPS (MODALITà DEBUG) .write per salvare i cambi  ./ per salvare file .map nello stesso percorso dove è stato creato il file
}

//DEFINISCO NUOVO TASK WATCHER DEI FILE JS, CONTROLLO MODIFICHE FILE
const watchJs = function(cb) {
    const prod = args.prod; //VARIABILE PER LEGGERE IL PARAMETRO SE BUILD DI PRODUZIONE O SVILUPPO
    if(prod) { //se in modalità di PRODUZIONE IL WATCH NON VIENE LANCIATO, PROCESSO CHE NON SERVE IN MODALITà PROD
        return cb(); //chiamo calback per comunicare a gulp di terminare il processo, return interrompe l'esecuzione
    }
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