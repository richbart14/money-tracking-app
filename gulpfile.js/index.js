//In questa prima parte installiamo Gulp e implementiamo i primi processi automatizzati della piattaforma.
//punto d'entrata del nostro processo automatizzato lanciato da GULP

//IMPORTO GULP
const gulp = require("gulp");
//importo funzionalità series di gulp
const series = gulp.series; /*serve per lista di processi automatizzati che verranno eseguiti quando siamo in modalità
                             development, ovvero mentre stiamo sviluppando la nostra applicazione*/

//definisco primo processo dentro series, COMPILEINDEX, all'interno di un nuovo file
const compileIndex = require("./viewTasks").compileIndex; /*lo chiamo viewTasks, ovvero tutti quei processi che riguardano 
                                          le nostre viste, quindi i nostri file HTML, nel nostro caso soltanto l'index.html*/
//importo secondo processo copyJs
const copyJs = require("./jsTasks").copyJs;                                          

//chiamo questo series DEV
const dev = series(compileIndex, copyJs /*, serve, watchHtml*/); /*invoco metodo series su una lista di processi che vado ad inizializzare 
                                 successivamente in alcuni file separati.
                                 Un primo processo sarà quello di compilare in nostro index,
                                 ovvero il nostro file HTML.
                                 A seguire avremo un nuovo processo che si chiamerà serve che si incaricherà di
                                 lanciare il nostro index.html di forma automatica all'interno di un browser.
                                 Ed infine watchHtml che si occuperà di guardare se all'interno del nostro file html
                                 ci sono stati dei cambi e di riavviare quindi il processo di compilazione e di SERVE.*/

//UNA VOLTA DEFINITI QUESTI 3 PROCESSI LI ANDIAMO A DEFINIRE UNO PER UNO ALL'INTERNO DEI PROPRI FILE.
//MA PRIMA VA EFFETTUATO UN EXPORT AFFINCHè GULP POSSA RITROVARE LA NOSTRA FUNZIONALITà dev (riga 9)

/*PER AVVIARE GULP DEVO INSERIRE NEGLI scripts DEL package.json il processo che permette di avviare l'utilità di gulp.
vado quindi ad inserire lo script dev, il nostro metodo dev presente in index.js che andrà a richiamare gulp dev, 
la nostra series di sviluppo.
POI LANCIO LO SCRIPT DEL TERMINALE npm run dev
che compilerà il nostro index.html dentro cartella DIST */

module.exports = {
    dev: dev
}
