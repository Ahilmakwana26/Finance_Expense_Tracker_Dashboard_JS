export let Transaction_arr = [];
export let originalTransaction_arr = null;

export function setOriginalTransactions(transactions) {
    originalTransaction_arr = transactions;
}
export function getTransactions() {
    return Transaction_arr;
}

export function setTransactions(newArr) {
    Transaction_arr = [...newArr];
}

export function addTransaction(newTransaction) {
    Transaction_arr.push(newTransaction);
}
export function updateTransaction(id) {
    let editData = getTransactionById(id);
    return editData;
}
export function removeTransaction(id) {
    let deleteTran_inx = Transaction_arr.findIndex(item => item.id === id);
    if (deleteTran_inx) {
        Transaction_arr.splice(deleteTran_inx, 1);
        return true;
    }
    return false;
}
export const FillForm = (form, data) => {
    //converts the object into an array of [key, value] pairs:
    Object.entries(data).forEach(([key, value]) => {
        let field = form.elements[key];
        if (field) {
            field.value = value;
        }
    })
    //The browser is doing a lot of the work for you. That's one of the nice things about the DOM form API.
}
export function getTransactionById(id) {
    return Transaction_arr.find(transaction => transaction.id == id);
}
