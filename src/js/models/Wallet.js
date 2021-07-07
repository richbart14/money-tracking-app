//portafoglio, oggetto di riferimento
//wallet.js è un costruttore, conterrà funzionalità principali del nostro portafoglio

function getWallet() { //funzione che ci permetterà di leggere dal LOCAL STORAGE
    var wallet = localStorage.getItem('wallet'); //vado a ricercare il portafoglio salvato nel local storage
    /*funzione getItem dell'oggetto localStorage ci restituirà "null" nel caso in cui non trovasse
    nessuna corrispondenza, o ci ritornerà la stringa dell'elemento salvato*/
    if(!wallet) { //verifico che wallet esista
        return { //se non dovesse sistere effettuo return di un iniziale stato del portafoglio
            balance: 0,
            operations: []
        }
    }
    //nel caso in cui invece esista, effettuo il parse della stringa che mi restituisce il getItem per trasformarla in oggetto JSON 
    return JSON.parse(wallet);
}

/*
Wallet sarà il nostro costruttore, per questo ha lettera iniziale Maiuscola.
Costruttore non è altro che una funzione, ovvero un oggetto, che permette attraverso la
parola chiave NEW la creazione di un istanza di un oggetto che possa isolare il suo contesto
*/
class Wallet {
    constructor() {
        //saldo e lista, proprietà visibili solo all'interno di questo blocco di codice Wallet
        //perchè non le ho dichiarate con il this. Così evito possibili corruzioni esterne non volute
        var balance = 0;  //SALDO
        var operations = []; //LISTA DELLE OPERAZIONI (Array)

        function init() { //avrà il compito di inizializzare il nostro saldo e la nostra lista operazioni 
            var wallet = getWallet(); /*il nostro wallet sarà inizialmente un portafoglio vuoto, però man mano che
                                      l'utente aggiungerà le operazioni necessiteremo di una forma di salvataggio
                                      delle operazioni all'interno del browser. LOCAL STORAGE*/
            balance = wallet.balance;
            operations = wallet.operations;
        }; 

        /*Scrivendo normalmente ad es.  function addOperation()
        le funzioni sono all'interno dello scope del wallet e non vengono stampate nel console.log(wallet) di prova in index.js.
        Per renderle pubbliche devo salvarle all'interno del this*/
        this.addOperation = function() {
        };
        this.removeOperation = function() {
        };
        this.findOperation = function() {
        };
        this.getBalance = function() {
            return balance; //return del balance
        };
        this.getOperations = function() {
            return operations; //return della lista delle operazioni
        };
        init(); //invoco funzione INIT alla fine di tutte le dichiarazioni affinchè il wallet venga inizializzato correttamente
    }
}