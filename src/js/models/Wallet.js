const utilsTasks = require("../utils");
const WalletEnums = require("./enums");

function Wallet() {
    let balance = 0;
    let operations = [];
    function init() {
        const wallet = utilsTasks.getWallet();
        balance = wallet.balance;
        operations = wallet.operations;
    }
    function saveWallet() {
        localStorage.setItem('wallet', JSON.stringify({ balance: balance, operations: operations }));
    }
    this.addOperation = function(op) {
        if(!utilsTasks.isValidOperation(op)) {
            throw new Error(WalletEnums.WalletErrors.INVALID_OPERATION);
        }
        const operation = {
            id: new Date().getTime(),
            amount: parseFloat(op.amount),
            description: op.description.trim(),
            type: op.type,
            date: new Date().getTime()
        }
        if(op.type === WalletEnums.OpType.IN) {
            balance += operation.amount;
        } else if(op.type === WalletEnums.OpType.OUT) {
            balance -= operation.amount;
        }
        operations.push(operation);
        saveWallet();
    }
    this.removeOperation = function(id) {
        const operationIndex = utilsTasks.findIndex(operations, function(operation) {
            return operation.id === id;
        });
        if(operationIndex === -1) {
            throw new Error(WalletEnums.WalletErrors.OPERATION_NOT_FOUND);
        }
        const operation = operations[operationIndex];
        if(operation.type === WalletEnums.OpType.IN) {
            balance -= operation.amount;
        } else if(operation.type === WalletEnums.OpType.OUT) {
            balance += operation.amount;
        }
        operations.splice(operationIndex, 1);
        saveWallet();
    }
    this.findOperation = function(searchValue) {
        const val = searchValue.toLowerCase().trim();
        if(!val) {
            return operations;
        }
        const operationsFound = [];
        for(var i = 0; i < operations.length; i++) {
            const description = operations[i].description.toLowerCase();
            if(description.indexOf(val) > -1) {
                operationsFound.push(operations[i]);
            }
        }
        return operationsFound;
    }
    this.getBalance = function() {
        return balance;
    }
    this.getOperations = function() {
        return operations;
    }
    init();
}

module.exports = {
    Wallet: Wallet
}