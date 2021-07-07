//portafoglio, oggetto di riferimento
//wallet.js è un costruttore, conterrà funzionalità principali del nostro portafoglio
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
    }
}