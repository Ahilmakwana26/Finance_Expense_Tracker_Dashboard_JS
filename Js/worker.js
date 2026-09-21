import { getTransactionData, add, edit } from './api.js';
import { addTransaction, getTransactions, getTransactionById, Transaction_arr } from './state.js';
import { getLocalStorage, saveLocalStorage } from './storage.js';


export async function loadTransactions() {
    try {
        let res = await getTransactionData();

        if (res.length > 0) {
            Transaction_arr.push(...res);
        } else {
            getLocalStorage();
            console.log('local Data loaded !!');
        }

        return true;

    } catch (error) {
        console.log('something wrong', error);
    }
}


export async function addTransactionData(data) {
    let res = add(data); //add into DB
    if (res.status) {
        return res;
    } else {
        addTransaction(data)
        saveLocalStorage(getTransactions()); //fallback temporary Save into localstorage.
        alert('due to some issue ,your trasancation saved on local !');
    }
}

export async function editTransactionData(id) {
    let editTransaction = getTransactionById(id);

    let res = edit(editTransaction);

    if (res.status) {
        return res;
    } else {
        if (editTransaction) {
            Object.assign(editTransaction, data); //fallback edit into local
        }
    }
}