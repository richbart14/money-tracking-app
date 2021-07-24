/*Inserimento dell'index.css all'interno della nostra cartella DIST, per la nostra BUILD*/
//questo file si occupa degli ASSETS -> CSS, IMMAGINI, ICONE e quant'altro.

const gulp = require("gulp");
const gulpIf = require("gulp-if"); //libreria che ci permette di creare la condizione
const args = require("yargs").argv; //Libreria ARGUMENTS, ci permette di leggere i parametri PROD o DEV che vengono passati nella linea di comando
/*INSTALLAZIONE altre LIBRERIE: npm i gulp-minify-css gulp-concat -D*/
const minifyCSS = require("gulp-minify-css");
const concat = require("gulp-concat"); //libreria CONCAT, ci permette di concatenare diversi file, ad esempio diversi file CSS a partire dall'index.css, e li vogliamo unire
const svgmin = require("gulp-svgmin"); //npm i gulp-svgmin -D, libreria che ci permette di minificare svg
const paths = require("./paths"); //IMPORTO PATHS che è il file dove gestisco i percorsi dell'applicazione

//foglio di stile che deve essere MINIFICATO in caso di build di PRODUZIONE
/*funzione che si occuperà di analizzare se la build è di produzione o no, e quindi di minificare nel caso sia di produzione.
 Succesivamente si incaricherà di salvare il contenuto processato all'interno della cartella DIST*/
const processCSS = function() {
    const prod = args.prod; //variabile che legge parametro se build di produzione o sviluppo
    //se PROD utilizzeremo il GULP-IF per effettuare la MINIFICAZIONE o meno.
    return gulp.src(paths.getCSSSrcPath("**/*")) // **/* tutto ciò che è CSS deve essere preso ed inserito nel source di GULP
    //qusto pipe concat() ci permetterà di concatenare tutti i file all'interno di un unico file di destinazione
    //abbiamo preso tutti i file css che sono all'interno della cartella src/css e li abbiamo concatenati all'interno di index.css
        .pipe(concat(paths.getOutputCSSFilename())) 
        //MINIFICAZIONE nel caso sia build produzione
        .pipe(gulpIf(prod, minifyCSS()))
        //ed infine gulp.DEST, per salvare questi file processati nella cartella di destinazione DIST
        .pipe(gulp.dest(paths.getCSSOutputPath()));
}

//AGGIUNGO WATCHER DEL CSS
const watchCSS = function(cb) {
    const prod = args.prod; //se è un processo di PRODuzione non voglio avviare il watch, quindi leggo argomento parametro
    if(prod) { //se di produzione termina processo con la calback cb
        return cb()
    }
    gulp.watch(paths.getCSSSrcPath("**/*"), processCSS); //gulp.watch metodo di GULP
    cb();
}

//PROCESSICONS PER GESTIRE ICONE CSS
const processIcons = function() {
    return gulp.src(paths.getIconsSrcPath("**/*.svg"), { relative: true, base: paths.getSrcFolder() }) //? facendo ciò non c'è bisogno di specificare percorso per output cartella icons in gulp.dest
    //source con il percorso base, **/* ci permette di ottenere tutti i file contenuti in cartella e sottocartella che abbiano estensione .svg
    .pipe(svgmin()) //pipe per eseguire minificazione svg, anche le immagini devono essere ottimizzate
    .pipe(gulp.dest(paths.getDistFolder())); //salvo nella cartella di destinazione
}

/*AGGIUNGO WATCHER DI ICONS, tutto ciò che viene inserito nella cartella src/icons deve essere tenuto sott'occhio e deve 
 essere aggiornata la cartella di destinazione qualora ci sia un cambio*/
const watchIcons = function(cb) {
    const prod = args.prod; //se è un processo di PRODuzione non voglio avviare il watch, quindi leggo argomento parametro
    if(prod) { //se di produzione termina processo con la calback cb
        return cb()
    }
    gulp.watch(paths.getIconsSrcPath("**/*"), processIcons); //gulp.watch metodo di GULP
    //tutto ciò che vi è all'interno di icons source path
    cb();
}


//ESPORTO FUNZIONI affinchè GULP POSSA TROVARLE (DEVO RICHIAMARLA NEL SERIES DI index.js)
module.exports = {
    processCSS: processCSS,
    watchCSS: watchCSS,
    processIcons: processIcons,
    watchIcons: watchIcons
}