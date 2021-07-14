//ALL'INTERNO DI QUESTO VIEWTASKS INSERISCO TUTTO CIò CHE RIGUARDA LE NOSTRE VISTE
//prima di tutto va importato GULP
const gulp = require("gulp");
const inject = require("gulp-inject"); /*installo gulp inject, è UN PLUGIN DI GULP, che ci permette di inserire all'interno
                                        di un file quello che vogliamo, la stringa che vogliamo (stringa script src)
                                        npm i gulp-inject -D*/

//CREO FUNZIONE ANONIMA compileIndex
const compileIndex = function() {
    //definisco istruzione al suo interno: conterrà il cosiddetto PIPELINE, il processo a cascata che contraddistingue GULP
    
    /*una volta installato pacchetto gulp-inject definisco file in entrata attraverso gulp.src
    che andrò ad utilizzare nel primo pipe con metodo inject */
    const jsIndex = gulp.src("./src/js/index.js");
    const utilsIndex = gulp.src("./src/js/utils.js");
    const modelsIndex = gulp.src("./src/js/models/Wallet.js");

    /*quello che andremo a restituire sarà sempre un qualcosa legato a gulp,
    parto da un file di entrata che sarà index.html*/
    return gulp.src("./src/index.html")
    //definisco cosa volgio fare con questo index.html utilizzando i metodi pipe()
        .pipe(inject(jsIndex, { relative: true, name: "custom" })) //lo inserisco all'interno di una sezione che chiamo CUSTOM
        /*inserisco sezione in index.html attraverso <!-- custom:js --> <!-- endinject -->
                                                          nome sezione:tipo di file
                                                          e poi si occuperà di tutto il modulo INJECT*/
        .pipe(inject(utilsIndex, { relative: true, name: "custom:utils" }))
        .pipe(inject(modelsIndex, { relative: true, name: "custom:models" }))
                                    //mettendo relative il percorso sarà relativo alla cartella dist, importante

    //ed il'ultimo pipe() si incaricherà di inserire all'interno della nostra destinazione il file modificato
        .pipe(gulp.dest("./dist")); //destinazione sarà cartella dist
}

/*PER AVVIARE GULP DEVO INSERIRE NEGLI scripts DEL package.json il processo che permette di avviare l'utilità di gulp.
vado quindi ad inserire lo script dev, il nostro metodo dev presente in index.js che andrà a richiamare gulp dev, 
la nostra series di sviluppo. 
POI LANCIO LO SCRIPT DEL TERMINALE npm run dev
che compilerà il nostro index.html dentro cartella DIST */

//ESPORTO FUNZIONE compileIndex
module.exports = {
    compileIndex: compileIndex
}