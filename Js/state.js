export let Transaction_arr = [];
export let originalTransaction_arr = null;

import { TransactionForm, formModalReset,globalUpate } from "./app.js";
import { handleOpenCloseModal, setModalMode } from './ui-modal.js';
import {saveLocalStorage} from './storage.js';


export function setOriginalTransactions(transactions) {
    originalTransaction_arr = transactions;
}
export function getTransactions() {
    return [...Transaction_arr];
}

export function setTransactions(newArr) {
    Transaction_arr = [...newArr];
}

export function addTransaction(newTransaction) {
    Transaction_arr.push(newTransaction);
}
export function updateTransaction(id) {
    let editData = getTransactionData(id);
    handleOpenCloseModal('open');
    formModalReset('edit');
    FillForm(TransactionForm, editData);
}
export function removeTransaction(id) {
    let deleteTran_inx = Transaction_arr.findIndex(item => item.id === id);
    let userConfirmed = confirm('Are you sure want to delete this Transaction ?');
    if (deleteTran_inx && userConfirmed) {
        Transaction_arr.splice(deleteTran_inx, 1);
        globalUpate();
        saveLocalStorage(Transaction_arr);
    }
}
export function resetTransactions() {//restore from originalTransaction_arr (for filters)
    Transaction_arr = [...originalTransaction_arr];
}
const FillForm = (form, data) => {
    //converts the object into an array of [key, value] pairs:
    Object.entries(data).forEach(([key, value]) => {
        let field = form.elements[key];
        if (field) {
            field.value = value;
        }
    })
    //The browser is doing a lot of the work for you. That's one of the nice things about the DOM form API.
}
function getTransactionData(id) {
    return Transaction_arr.find((data) => data.id === id)
}