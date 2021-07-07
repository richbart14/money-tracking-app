(function() {  // IIFE (Immediately Invoked Function Expression)
               /*Per ragioni di sicurezza racchiudo blocco di istruzioni all'interno di una funzione anonima.
               Viene richiamata immediatamente non appena il browser vede la funzione.
               Nella IIFE creo spazio a sè stante che vive di vita propria, il tutto ha uno spazio riservato
               al di fuori del contesto globale.
               In questo modo wallet non è più accessibile per invocare funzioni dal console.log e la
               mia istanza sulla quale vengono richiamati i metodi è protetta*/

    var wallet; /*definisco variabile wallet in questo scope(globale) così sarà accessibile sia dalle funzioni che nel DOMContentLoad per istanziare new Wallet*/

    function addOperation() {

    }
    function removeOperation() {

    }
    function findOperation() {

    }
    function getBalance() {
        return wallet.getBalance(); //accedo al metodo inserito all'interno del costruttore
    }
    function getOperations() {
        return wallet.getOperations(); //accedo al metodo inserito all'interno del costruttore
    }

    /*inserisco creazione del nostro wallet, che avverrà solo quando il nostro DOM sarà pronto*/
    document.addEventListener('DOMContentLoaded', function() {
        wallet = new Wallet(); //creazione variabile wallet che sarà la nuova istanza del costruttore Wallet
        //console.log(wallet);  LOG PROVA per vedere class wallet con le sue funzioni
    });
})();
