import {Transaction_arr,setOriginalTransactions} from './state.js';
export function saveLocalStorage(transactions) {
    localStorage.setItem('myTransactions', JSON.stringify(transactions));
    return true;
}
export function getLocalStorage() {
    let saveData = JSON.parse(localStorage.getItem('myTransactions')) || [];
    if (Array.isArray(saveData)) {
        Transaction_arr.push(...saveData);
        setOriginalTransactions([...Transaction_arr]);

    }
}