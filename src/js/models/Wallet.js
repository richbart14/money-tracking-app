//portafoglio, oggetto di riferimento
//wallet.js è un costruttore, conterrà funzionalità principali del nostro portafoglio

var OpType = { //racchiude tipi di operazioni eseguibili all'interno della piattaforma, utilizzo OpType in funzione addOperation per controllo tipo spesa
    OUT: 'OUT',       //ENUMERATORI
    IN: 'IN'
}

var WalletErrors = {   //funzione che racchiude errori personalizzati, enumeratore, lista di errori prestabilita  
    INVALID_OPERATION: 'INVALID_OPERATION'  //invalid operation ha come valore stringa "invalid_operation", nome che assegno io
}

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

function isValidOperation(op) { //funzione che ci permetterà di verificare se l'operazione che riceviamo sia valida o no, vedi addOperation
    //prima verifica, validazione, vedere se l'operazione esiste
    /*op esiste solo se primo op ha valore true, se ha una descrizione, se il suo ammontare è un numero maggiore di 0
      e se op.type è pari ad uno dei enumeratori, se esiste all'interno di OpType */
    return op && op.description && parseFloat(op.amount) > 0 && typeof OpType[op.type] !== 'undefined';  //parseFloat analizza una stringa e restituisce un numero
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
        function saveWallet() { //funzione che ci permetterà di salvare il nostro portafoglio all'interno del LOCAL STORAGE
            localStorage.setItem('wallet', JSON.stringify({ balance: balance, operations: operations })); //metodo stringify per convertire oggetto in stringa
            //passo i parametri del wallet, balance e operations, salvo oggetto composto da questi valori
        }

        /*Scrivendo normalmente ad es.  function addOperation()
        le funzioni sono all'interno dello scope del wallet e non vengono stampate nel console.log(wallet) di prova in index.js.
        Per renderle pubbliche devo salvarle all'interno del this*/
        this.addOperation = function(op) { //funzione addOperation riceverà un parametro, ovvero l'oggetto che si vuole aggiungere
            //validazione parametro in entrata, creo condizione isValidOperation e passo parametro op
            if(!isValidOperation(op)) { //se non è valida lancio errore
                throw new Error(WalletErrors.INVALID_OPERATION); //INVALID_OPERATION nome che assegno io in WalletErrors
            }
            var operation = {
                amount: parseFloat(op.amount),  //ammontare dell'operazione
                description: op.description, //descrizione, causale spostamento denaro
                type: op.type, //tipo, spesa o entrata
                date: new Date().getTime()  //getDate metodo dell'oggetto Date, restituisce tempo in millisecondi (dall'epoch-time 1970)
            }
            /*controllo il tipo di operazione, rimuovere dal nostro saldo l'ammontare dell'operazione se è operazione
            in uscita, o viceversa se è operazione in entrata aggiungere al nostro saldo l'ammontare dell'operazione*/
            if(op.type === OpType.IN) { //utilizzo enumeratori definiti in cima al file nella variabile OpType
                balance = operation.amount + balance; //ENTRATA
            } else if (op.type === OpType.OUT) {
                balance = balance - operation.amount; //SPESA
            }
            //Aggiungo operazione alla lista di operazioni, array operations
            operations.push(operation);
            saveWallet(); //funzione che ci permetterà di salvare il nostro portafoglio all'interno del LOCAL STORAGE
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