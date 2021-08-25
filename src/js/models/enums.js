const OpType = Object.freeze({
    OUT: 'OUT',
    IN: 'IN'
});
const WalletErrors = Object.freeze({
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND'
});
const SnackbarTypes = Object.freeze({
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
});
module.exports = {
    OpType: OpType,
    WalletErrors: WalletErrors,
    SnackbarTypes: SnackbarTypes
}