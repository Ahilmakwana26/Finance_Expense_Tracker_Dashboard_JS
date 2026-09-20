import {getTransactionData,add} from './api.js';
import {addTransaction,getTransactions} from './state.js';
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