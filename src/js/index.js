//(function() {  // IIFE (Immediately Invoked Function Expression)
               /*Per ragioni di sicurezza racchiudo blocco di istruzioni all'interno di una funzione anonima.
               Viene richiamata immediatamente non appena il browser vede la funzione.
               Nella IIFE creo spazio a sè stante che vive di vita propria, il tutto ha uno spazio riservato
               al di fuori del contesto globale.
               In questo modo wallet non è più accessibile per invocare funzioni dal console.log e la
               mia istanza sulla quale vengono richiamati i metodi è protetta*/

    /*BROWSERIFY: FUNZIONE IIFE NON SERVE PERCHè BROWSERIFY GIà INCAPSULA LE NOSTRE FUNZIONI ALL'INTERNO DI UN AMBIENTE ISOLATO
        AFFINCHè NON CI SIANO CONFLITTI FRA MODULI E PER ISOLARE OGNI MODULO*/

    //let wallet; /*definisco variabile wallet in questo scope(globale) così sarà accessibile sia dalle funzioni che nel DOMContentLoad per istanziare new Wallet*/
    
    const Wallet = require("./models/Wallet").Wallet; //require di Wallet, serve per BROWSERIFY

    const addOperation = function(op) {
        try {
            wallet.addOperation(op); //vedo op in entrata e la passo ad addOperation nel costruttore wallet
        } catch(e) {
            console.error(e);
        }
    }
    /*TRY-CATCH per gestione degli errori mirata alle operazioni. Stampo con il console.error l'errore.
    Registro l'errore con il console.error.
    Ciò ci permette di evitare che venga stampato in automatico l'errore in rosso all'interno della console.*/
    const removeOperation = function(id) {
        try {
            wallet.removeOperation(id); //richiamo removeOperation passando l'identificativo
        } catch(e) {
            console.error(e);
        }
    }
    
    const findOperation = function(val) {
        return wallet.findOperation(val); //return serve perchè è operazione di restituzione di un elemento
    }
    
    const getBalance = function() {
        return wallet.getBalance(); //accedo al metodo inserito all'interno del costruttore
    }
    
    const getOperations = function() {
        return wallet.getOperations(); //accedo al metodo inserito all'interno del costruttore
    }

    /*inserisco creazione del nostro wallet, che avverrà solo quando il nostro DOM sarà pronto*/
    window.addEventListener('DOMContentLoaded', function() {
        wallet = new Wallet(); //creazione variabile wallet che sarà la nuova istanza del costruttore Wallet
        //console.log(wallet);  LOG PROVA per vedere class wallet con le sue funzioni
    });
//})();
