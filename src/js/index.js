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

    let wallet;
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

    const toggleModal = function() { //FUNZIONE CAMBIO VISIBILITà PANNELLO ADD OPERATION 
        const modalComponent = document.getElementById('modal'); //PRENDO modal container
        if(modalComponent){ //IF controllo che esista
            const isHidden = modalComponent.classList.contains('hide'); //controllo modal container contenga classe 'hide'
            //contains restituisce booleano true/false, salvo risultato nella costante isHidden
            if(isHidden) { //se true, se classe hide c'è, se è nascosto il pannello
                modalComponent.classList.remove('hide'); //lo andiamo a mostrare rimuovendo la classe hide
                //se qua inserisco return posso evitare di concatenare un else
            }else{
                modalComponent.classList.add('hide'); //altrimenti lo andiamo a mostrare
            }
        }
    }
    window.toggleModal = toggleModal; /*aggiungo funzione toggleModal al window perchè deve avere scope globale e perchè 2 pulsanti devono
                                        accedere alla stessa funzione, + e x, apri e chiudi pannello, in questo modo velocizzo
                                        per non ripetere stessa operazione di addeventlistener per entrambi i pulsanti.
                                        Se sappiamo che l'evento si deve ripetere anche per altri elementi gestire il tutto
                                        con l'addEventListener diventa più complicato.*/

    /*inserisco creazione del nostro wallet, che avverrà solo quando il nostro DOM sarà pronto*/
    window.addEventListener('DOMContentLoaded', function() {
        wallet = new Wallet(); //creazione variabile wallet che sarà la nuova istanza del costruttore Wallet
        //console.log(wallet);  LOG PROVA per vedere class wallet con le sue funzioni
    });
//})();
