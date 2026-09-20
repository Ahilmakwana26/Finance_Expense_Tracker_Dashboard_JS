import {getTransactionData,add,edit} from './api.js';
import {addTransaction,getTransactions,getTransactionById} from './state.js';
import {getLocalStorage,saveLocalStorage} from './storage.js';


export async function loadTransactions (){
     let res = await getTransactionData(); //get from DB
    if(res){
        Transaction_arr.push(...res);
    }else{
        getLocalStorage(); //fallback
        console.log('local Data loaded !!');
    }
}

export async function addTransactionData(data) {
    let res = add(data); //add into DB
    if(res.status){
        return res;
    }else{
        addTransaction(data)
        saveLocalStorage(getTransactions()); //fallback temporary Save into localstorage.
        alert('due to some issue ,your trasancation saved on local !');
    }
}

export async function editTransactionData(id) {
     let editTransaction = getTransactionById(id);

     let res = edit(editTransaction);

     if(res.status){
        return res;
     }else{
        if (editTransaction) {
            Object.assign(editTransaction, data); //fallback edit into local
        }
     }
}