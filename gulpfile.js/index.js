//In questa prima parte installiamo Gulp (task runner) e implementiamo i primi processi automatizzati della piattaforma.
//punto d'entrata del nostro processo automatizzato lanciato da GULP  
//Per installare GULP:  npm i gulp -D (si crea cartella node modules e package-lock.json) (con -D comunichiamo che sarà una dev-dependencies nel package.json, libreria di sviluppo)
//(Prima di Gulp crea carta identità del progetto package.json->  npm init )

//IMPORTO GULP
const gulp = require("gulp");
//importo funzionalità series di gulp
const series = gulp.series; /*serve per lista di processi automatizzati che verranno eseguiti quando siamo in modalità
                             development, ovvero mentre stiamo sviluppando la nostra applicazione*/

const paths = require("./paths"); //IMPORTO PATHS che è il file dove gestisco i percorsi dell'applicazione  

//definisco primo processo dentro series, COMPILEINDEX e WATCHINDEX(watchhtml), entrambi all'interno di viewTasks
const viewTasks = require("./viewTasks"); /*file chiamato viewTasks, ovvero tutti quei processi che riguardano 
                                          le nostre viste, quindi i nostri file HTML, nel nostro caso soltanto l'index.html*/
//importo secondo processo copyJs e terzo processo watchJs
const jsTasks = require("./jsTasks");    

//importo assetsTasks(CSS)
const assetsTasks = require("./assetsTasks");

//importo funzione serve
const serveTasks = require("./serveTasks");

//importo libreria del ->   npm i del -D   si occupa di effettuare rimozioni sia di cartelle che di file
const del = require("del");
/* processo che ci permetterà di cancellare in automatico contenuto della cartella di destinazione quando avvio processo npm run dev*/
const clean = function(cb) {
    del.sync(paths.getDistFolder(), { force: true }); //in modo sincrono perchè voglio aspettare che percorso di destinazione sia cancellato
    //force TRUE ci permette di forzare e non interrompere l'esecuzione qualora per esempio non dovesse trovare il file o la cartella
    cb(); //funzione di calback che gulp utilizza per capire se un processo è terminato qualora non dovesse restituire un pipe
}
 
//chiamo questo series DEV (poi chiamata BUILD quando ho aggiunto modalità di produzione a modalità di sviluppo)
const build = series(clean, viewTasks.compileIndex, assetsTasks.processCSS, assetsTasks.watchCSS, jsTasks.bundleJS, jsTasks.watchJs, viewTasks.watchIndex, serveTasks.serve); 
                                /*invoco metodo series su una lista di processi che vado ad inizializzare 
                                 successivamente in alcuni file separati.
                                 Un primo processo sarà quello di compilare il nostro index,
                                 ovvero il nostro file HTML.
                                 A seguire avremo un nuovo processo che si chiamerà serve che si incaricherà di
                                 lanciare il nostro index.html in forma automatica all'interno di un browser.
                                 Ed infine watchHtml che si occuperà di guardare se all'interno del nostro file html
                                 ci sono stati dei cambi e di riavviare quindi il processo di compilazione e di SERVE.*/

//UNA VOLTA DEFINITI QUESTI 3 PROCESSI LI ANDIAMO A DEFINIRE UNO PER UNO ALL'INTERNO DEI PROPRI FILE.
//MA PRIMA VA EFFETTUATO UN EXPORT AFFINCHè GULP POSSA RITROVARE LA NOSTRA FUNZIONALITà dev (riga 9)

/*PER AVVIARE GULP DEVO INSERIRE NEGLI scripts DEL package.json il processo che permette di avviare l'utilità di gulp.
vado quindi ad inserire lo script dev, il nostro metodo dev presente in index.js che andrà a richiamare gulp dev, 
la nostra series di sviluppo.
POI LANCIO LO SCRIPT DEL TERMINALE npm run dev
che compilerà il nostro index.html dentro cartella DIST */

//ESPORTO DEV AFFINCHè GULP POSSA RITROVARE FUNZIONALITà DEV (l'ho chiamata build quando ho implementato modalità di produzione a modalità di sviluppo)
module.exports = {
    build: build
}
