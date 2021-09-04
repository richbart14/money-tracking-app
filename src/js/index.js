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
    event.preventDefault();
    const formElement = event.target.closest('form');
    if (!formElement) { /*se non trovo il form termino l'esecuzione*/
        return;
    }
    formElement.reset(); /*altrimenti chiamo reset del form*/
    updateOperationsTable(); /*e aggiorno tabella con tutti i valori ritrovati
    CLICCANDO SULLA X CANCELLA IL VALORE E RESTITUISCE NUOVAMENTE TUTTI I VALORI DELLA TABELLA*/
}
const searchOperation = function (event) {
    event.preventDefault();
    const searchInput = event.target.searchInput; 
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
}/*formatto il getbalance in base al locale con utilità del number di javascript, prima restituiva un numero intero, ora separa migliaia col punto e decimali con la virgola.*/

const updateOperationsTable = function (initialOperation) { /*utilizzo parametro, per visualizzare solo elementi ricercati nel search o tutta la tabella*/
    /*OPERAZIONE TERNARIA. SE è un array lo utilizzo, altrimenti utilizzo come default il get operations.*/
    const operations = Array.isArray(initialOperation) ? Array.from(initialOperation) : Array.from(getOperations());
    const tableContainerElement = document.getElementById('table-container'); /*FALLBACK MESSAGE "No operations found"*/
    const tableElement = document.getElementById('table-body');
    if (!tableElement || !tableContainerElement) {
        return;
    }
    tableElement.innerHTML = ''; /*elimino previamente contenuto tabella*/
    if (!operations.length) { 
        tableContainerElement.classList.add('no-data');
        return; 
    }
    tableContainerElement.classList.remove('no-data');
    operations.reverse().forEach(function (operation) {
        tableElement.appendChild(getOperationTableRow(operation));
    });
}
const getOperationTableRow = function (operation) {
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
    const resetSearchElmnt = document.getElementById('reset-search-btn'); 
    if (!resetSearchElmnt) {
        return;
    }
    if (!searchValue) {
        resetSearchElmnt.classList.add('hide');
        return;
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
