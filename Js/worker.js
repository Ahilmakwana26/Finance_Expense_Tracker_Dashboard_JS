import { getTransactionData, add, edit , deleteData } from './api.js';
import { addTransaction, getTransactions, getTransactionById, Transaction_arr } from './state.js';
import { getLocalStorage, saveLocalStorage } from './storage.js';


export async function loadTransactions() {
    try {
        let res = await getTransactionData();

        if (res.length > 0) {
            Transaction_arr.length = 0;
            Transaction_arr.push(...res);
        } else {
            getLocalStorage();
            console.log('local Data loaded !!');
        }

        return true;

    } catch (error) {
        console.log('something wrong', error);
        alert(error.message);
    }
}


export async function addTransactionData(data) {
    let res = await add(data); //add into DB
    if (res.success) {
        alert(res.message || 'Data saved Successfully');
        return;

    } else {
        addTransaction(data)
        saveLocalStorage(getTransactions()); //fallback temporary Save into localstorage.
        alert('due to some issue , trasancation saved on local !', res.message);
    }
}

export async function editTransactionData(data,id) {

    try {
        let editTransaction = getTransactionById(null,id);

        let res = await edit(data,id);

        if (res.success) {
            alert(res.message || 'Transaction Updated Successfully');
            return;
        } else {
            alert('due to some issue , trasancation edit on local !', res.message);
            if (editTransaction) {
                Object.assign(editTransaction, data); //fallback edit into local
            }
        }
    } catch (error) {
        console.log('some thing wrong error!!!');
        alert(error.message);
    }
}
export async function DeleteTransactionData(id) {
    try{
        let res = await deleteData(id);
        if(res.success){
            alert(res.message || "Transaction Delete Successfully")
            return true;
        }
    }catch(error){
        alert(error.message);
    }
}