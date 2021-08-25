const Wallet = require("./models/Wallet").Wallet;
const Enums = require("./models/enums");

let wallet;

const hideSnackbar = function () {
    const toastElement = document.getElementById('toast');
    toastElement.classList.remove('show');
    toastElement.classList.remove('toast--error');
}
const showMessage = function (msg, type) {
    const toastElement = document.getElementById('toast');
    if (!toastElement || !msg || !Enums.SnackbarTypes[type]) {
        return;
    }
    if (type === Enums.SnackbarTypes.ERROR) {
        toastElement.classList.add('toast--error');
    }
    const messageElement = toastElement.querySelector('.toast__message');
    messageElement.textContent = msg;
    toastElement.classList.add('show');
    setTimeout(function () {
        hideSnackbar();
    }, 5000);
}
const addOperation = function (ev) {
    ev.preventDefault();
    const submitButton = ev.submitter;
    const type = submitButton.getAttribute('data-type');
    const amountInput = ev.target.amount;
    const descriptionInput = ev.target.description;
    const operation = {
        amount: amountInput.value,
        description: descriptionInput.value,
        type,
    };
    try {
        wallet.addOperation(operation);
        updateBalance();
        ev.target.reset();
        updateOperationsTable();
        toggleModal();
        showMessage('Operation added successfully!', Enums.SnackbarTypes.SUCCESS);
    } catch (e) {
        console.error(e);
        showMessage('Operation not added!', Enums.SnackbarTypes.ERROR);
    }
}
const removeOperation = function (id) {
    try {
        wallet.removeOperation(id);
        updateOperationsTable();
        updateBalance();
        showMessage('Operation removed successfully!', Enums.SnackbarTypes.SUCCESS);
    } catch (e) {
        console.error(e);
        showMessage('Operation not removed!', Enums.SnackbarTypes.ERROR);
    }
}
const resetSearch = function (event) { /*FUNZIONE PER RESETTARE IL FORM DI RICERCA CON LA "X"*/
    event.preventDefault(); /*leggo l'event e fermo il submit/reindirizzamento del form*/
    const formElement = event.target.closest('form'); /*ricerco il form*/
    if (!formElement) { /*se non trovo il form termino l'esecuzione*/
        return;
    }
    formElement.reset(); /*altrimenti chiamo reset del form*/
    updateOperationsTable(); /*e aggiorno tabella con tutti i valori ritrovati
    CLICCANDO SULLA X CANCELLA IL VALORE E RESTITUISCE NUOVAMENTE TUTTI I VALORI DELLA TABELLA*/
}
const searchOperation = function (event) {
    event.preventDefault(); /*ricevo l'event e uso preventDefault per evitare reindirizzamento*/
    const searchInput = event.target.searchInput; /*leggo/prendo il valore con event.target dal name nel form searchInput*/
    /*console.log(wallet.findOperation(searchInput.value)) LEGGO OPERAZIONI NEL CONSOLE LOG*/
    const operationsToAdd = wallet.findOperation(searchInput.value);
    updateOperationsTable(operationsToAdd); /*UTILIZZO PARAMETRO per visualizzare solo elementi ricercati nel search o tutta la tabella, VEDI updateOperationsTableS*/
}
const getBalance = function () {
    return wallet.getBalance();
}
const getOperations = function () {
    return wallet.getOperations();
}
const toggleModal = function () {
    const modalComponent = document.getElementById('modal');
    if (!modalComponent) {
        return;
    }
    const isHidden = modalComponent.classList.contains('hide');
    if (isHidden) {
        modalComponent.classList.remove('hide');
        return;
    }
    modalComponent.classList.add('hide');
}
const updateBalance = function () {
    const balanceElement = document.getElementById('balance-box');
    if (!balanceElement) {
        return;
    }
    balanceElement.textContent = parseFloat(getBalance()).toLocaleString();
}/*formatto il getbalance in base al locale, prima restituiva un numero intero, ora separa migliaia col punto e decimali con la virgola.
parseFloat per essere sicuri che arrivi un numero. utilità del number di javascript*/

const updateOperationsTable = function (initialOperation) { /*utilizzo parametro, per visualiizare solo elementi ricercati nel search o tutta la tabella*/
    /*OPERAZIONE TERNARIA. se initialOperation è un array lo utilizzo (SEARCH), altrimenti effettuo tutto l'aggiornamento della tabella in base a getOperations*/
    /*SE è un array lo utilizzo, altrimenti utilizzo come default il get operations.*/
    const operations = Array.isArray(initialOperation) ? Array.from(initialOperation) : Array.from(getOperations()); /*prima di implementare il search, era presente soltanto Array.from(getOperations())*/
    const tableContainerElement = document.getElementById('table-container'); /*ottengo ID table-container per FALLBACK MESSAGE "No operations found"*/
    const tableElement = document.getElementById('table-body');
    if (!tableElement || !tableContainerElement) {
        return; /*Controllo che esistano altrimenti return, condizione unica*/
    }
    tableElement.innerHTML = ''; /*elimino previamente contenuto tabella*/
    if (!operations.length) { /*se non ha operazioni al suo interno, non ci sono operazioni nel wallet*/
        tableContainerElement.classList.add('no-data'); /*aggiungi classe no data ed effettuo il return*/
        return; 
    }
    tableContainerElement.classList.remove('no-data'); /*altrimenti rimuovi classe no-data*/
    operations.reverse().forEach(function (operation) {
        tableElement.appendChild(getOperationTableRow(operation));
    });
}
const getOperationTableRow = function (operation) {
    // Add operation to table
    const trRow = document.createElement('tr');
    trRow.setAttribute('data-op-type', operation.type.toLowerCase());
    const cells = [{
        value: operation.description
    }, {
        value: parseFloat(operation.amount).toLocaleString(),
        classes: 'operation-amount'
    }, {
        value: new Date(operation.date).toLocaleString(),
    }];
    cells.forEach(function (cell) {
        const td = document.createElement('td');
        td.textContent = cell.value;
        if (cell.classes) {
            td.className = cell.classes;
        }
        trRow.appendChild(td);
    });
    trRow.appendChild(getDeleteActionBtn(operation));
    return trRow;
}
const getDeleteActionBtn = function (operation) {
    const tdAction = document.createElement('td');
    tdAction.className = 'align-text-center';
    const actionButton = document.createElement('button');
    actionButton.className = 'button button-icon button-animated icon-delete';
    actionButton.onclick = function () {
        removeOperation(operation.id);
    }
    tdAction.appendChild(actionButton);
    return tdAction;
}
const onSearchInputChange = function (event) { /*FUNZIONE PER MOSTRARE "X" NEL SEARCH, */
    const searchValue = event.target.value; /*ricevo l'evento e dall'evento ottengo il valore*/
    const resetSearchElmnt = document.getElementById('reset-search-btn'); /*prendo ID search button*/
    if (!resetSearchElmnt) {
        return; /*controllo che esista*/
    }
    if (!searchValue) { /*se non c'è un searchvalue è hide, altrimenti diventa visibile appena scrivo una lettera*/
        resetSearchElmnt.classList.add('hide'); /*vedi helpers.css, hide per pulsante nascosto di base*/
        return; /*aggiungo o elimino la classe hide*/
    }
    resetSearchElmnt.classList.remove('hide');
}
window.hideSnackbar = hideSnackbar;
window.addOperation = addOperation;
window.toggleModal = toggleModal;
window.searchOperation = searchOperation;
window.resetSearch = resetSearch;
window.onSearchInputChange = onSearchInputChange;
window.addEventListener('DOMContentLoaded', function () {
    wallet = new Wallet();
    updateBalance();
    updateOperationsTable();
});