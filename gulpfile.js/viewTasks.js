//ALL'INTERNO DI QUESTO VIEWTASKS INSERISCO TUTTO CIò CHE RIGUARDA LE NOSTRE VISTE, nel nostro caso index.html
//prima di tutto va importato GULP
const gulp = require("gulp");
const inject = require("gulp-inject"); /*installo gulp inject, è UN PLUGIN DI GULP, che ci permette di inserire all'interno
                                        di un file quello che vogliamo, la stringa che vogliamo (stringa script src)
                                        npm i gulp-inject -D
                                        SERVE PER LA COMPILAZIONE DEL NOSTRO INDEX*/
const paths = require("./paths"); //IMPORTO PATHS che è il file dove gestisco i percorsi dell'applicazione
                                    
//CREO FUNZIONE ANONIMA compileIndex
const compileIndex = function() {
    //definisco istruzione al suo interno: conterrà il cosiddetto PIPELINE, il processo a cascata che contraddistingue GULP
    
    /*una volta installato pacchetto gulp-inject definisco FILE IN ENTRATA attraverso GULP.SRC
    che andrò ad utilizzare nel primo pipe con metodo inject */
    //const jsIndex = gulp.src("./src/js/index.js");
    const jsIndex = gulp.src(paths.getJsEntryPath()); //UTILIZZO PERCORSI GENERATI CON PATH E NON LA STRINGA
    const utilsIndex = gulp.src(paths.getJsSrcPath("/utils.js"));
    const modelsIndex = gulp.src(paths.getJsSrcPath("/models/Wallet.js"));

    /*quello che andremo a restituire sarà sempre un qualcosa legato a gulp,
    parto da un file di entrata che sarà index.html*/
    //return gulp.src("./src/index.html")
    return gulp.src(paths.getHTMLEntryPath()) //UTILIZZO PERCORSI GENERATI CON PATH E NON LA STRINGA
    //definisco cosa voglio fare con questo index.html utilizzando i metodi pipe()
        .pipe(inject(jsIndex, { relative: true, name: "custom" })) //lo inserisco all'interno di una sezione che chiamo CUSTOM
        /*inserisco sezione in index.html attraverso <!-- custom:js --> <!-- endinject -->
                                                          nome sezione:tipo di file
                                                          e poi si occuperà di tutto il modulo INJECT*/
        //ELIMINO QUESTI 2 INJECT PERCHè CON BROWSERIFY NON SERVE, ci permettevano di aggiungere manualmente in queste sezioni i file. Ora tutto partirà da index.js
        //.pipe(inject(utilsIndex, { relative: true, name: "custom:utils" })) 
        //.pipe(inject(modelsIndex, { relative: true, name: "custom:models" }))
                                    //mettendo relative il percorso sarà relativo alla cartella dist, importante

    //e l'ultimo pipe() si incaricherà di inserire all'interno della nostra destinazione il file modificato
        //.pipe(gulp.dest("./dist")); //destinazione sarà cartella dist
        .pipe(gulp.dest(paths.getDistFolder())); //utilizzo funzione invece della stringa perchè leggo percorso da file paths che ho importato
}

/*PER AVVIARE GULP DEVO INSERIRE NEGLI scripts DEL package.json il processo che permette di avviare l'utilità di gulp.
vado quindi ad inserire lo script dev, il nostro metodo dev presente in index.js che andrà a richiamare gulp dev, 
la nostra series di sviluppo. 
POI LANCIO LO SCRIPT DEL TERMINALE npm run dev
che compilerà il nostro index.html dentro cartella DIST */

//IMPLEMENTO FUNZIONE DI WATCH ANCHE PER il file index.html
const watchIndex = function(cb) {
    gulp.watch(paths.getHTMLEntryPath(), compileIndex); //UTILIZZO PERCORSI GENERATI CON PATH E NON LA STRINGA
    cb();
}

//ESPORTO FUNZIONE compileIndex
module.exports = {
    compileIndex: compileIndex,
    watchIndex: watchIndex
}