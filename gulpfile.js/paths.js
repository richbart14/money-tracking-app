//FILE CHE CI PERMETTE DI GESTIRE IN UN UNICO PUNTO TUTTI I PERCORSI DELLA NOSTRA APPLICAZIONE
//DEFINISCO ALL'INTERNO TUTTI I PERCORSI DELLL'APPLICAZIONE
//ci basterà cambiare da quì i percorsi e il tutto verrà aggiornato anche nei file che utilizzano le relative funzioni

const paths = {
    //definisco percorsi, global riguarda le routes, cioè la cartella src e quella di destinazione dist
    global: {
        src: "./src",
        dist: "./dist"
    },
    //creo sezioni gestione html e js.
    html: {
        entry: "index.html",  //entry file
        dist: "index.html"   //destinazione, inteso solo come nome file e non come percorso di destinazione quindi nome è uguale
    },
    js: {
        entry: "index.js", //entry file
        base: "js",
        dist: "js"         //cartella di destinazione, dove vogliamo andare ad inserire questi file
    }
}

module.exports = {
    //funzioni che si incarica di gestire composizione dei percorsi file
    getDistFolder: function() {
        return paths.global.dist; //accedo a questi valori attraverso funzione
    },
    getSrcFolder: function() {
        return paths.global.src; //restituisce percorso folder src
    },
    getHTMLEntryPath: function() {
        return paths.global.src + '/' + paths.html.entry; 
    },
    getJsEntryPath: function() {
        return paths.global.src + '/' + paths.js.base + '/' + paths.js.entry;
    },
    getJsSrcPath: function(innerPath) {
        const baseJSPath = paths.global.src + '/' + paths.js.base;
        //se c'è un innerPath (parametro) mi restituisci la const base + il parametro
        if(innerPath) { 
            return baseJSPath + '/' + innerPath;
        } 
        //altrimenti solo la const base con il percorso lì dentro definito
        return baseJSPath;
    },
    //PERCORSI BROWSERIFY
    getJSOutputPath: function() { //cartella di destinazione funzione bundleJs
        return this.getDistFolder() + '/' + paths.js.dist;
    },
    getJSOutputEntry: function() {
        return paths.js.entry; //file con stesso nome index.js anche per cartella di destinazione, se voglio cambiare nome aggiungo output: a riga 18
    } 
}