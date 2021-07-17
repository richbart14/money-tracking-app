/*serve.js  ci permetterà di servire il nostro file di destinazione che è index.html
QUESTA FUNZIONALITà CI PERMETTE INNANZITUTTO DI 
1 -> AVVIARE IL BROWSER IN AUTOMATICO SENZA ANDARE NELLA CARTELLA E APRIRE IL FILE
MANUALMENTE ED INOLTRE CI PERMETTERà DI 
2 -> RICARICARE LA PAGINA QUALORA IL SISTEMA DOVESSE AVVERTIRE UN CAMBIO DI FILE
ALL'INTERNO DELLA NOSTRA CARTELLA DI DESTINAZIONE.

AGGIUNGO PERCIò NUOVA LIBRERIA browser-sync
PER INSTALLARLA:  npm i browser sync -D*/

//IMPORTO FUNZIONALITà BROWSER-SYNC
//metodo create() ci restituisce automaticamente l'oggetto che si occuperà di avviare il browser e gestire refresh della pagina
const browserSync = require("browser-sync").create();

const paths = require("./paths"); //IMPORTO PATHS che è il file dove gestisco i percorsi dell'applicazione

//creo processo SERVE, ci permetterà di avviare il browser
const serve = function() {
    browserSync.init({ //utilizzo l'init di questo oggetto
        watch: true, //SERVE PER IL REFRESH AUTOMATICO
        //in quale cartella la funzione deve andare a ricercare i file che vogliamo vedere all'interno del browser
        server: {
            baseDir: paths.getDistFolder() //baseDir è la cartella di destinazione (in questo caso dist)
        }
    });         
}

//ESPORTO FUNZIONE
module.exports = {
    serve: serve
}

//usando ora 'npm run dev' mi aprirà ora browser in localhost attraverso un nuovo sistema di server-rendering
/*crea un vero e proprio server dedicato che gira in lcoale all'interno del quale vengono isolate le risorse della 
nostra piattaforma che sono accessibili così in questo caso soltanto da localhost:3000*/
