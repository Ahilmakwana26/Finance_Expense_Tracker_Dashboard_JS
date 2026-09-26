import { getTransactionData, add, edit, deleteData } from './api.js';
import { addTransaction, getTransactions, getTransactionById, Transaction_arr } from './state.js';
import { getLocalStorage, saveLocalStorage } from './storage.js';


export async function loadTransactions() {
    try {
        let res = await getTransactionData();

        if (res.length > 0) {
            Transaction_arr.length = 0;
            Transaction_arr.push(...res);
            return { success: true, message: res.message };
        } else {
            getLocalStorage();
            return { success: false, message: 'Data from local successfully' };
        }

    } catch (error) {
        return { success: false, message: error };

    }
}


export async function addTransactionData(data) {
    try {
        const res = await add(data);
        return { success: true, message: res.message || 'Data saved successfully' };
    } catch (error) {
        addTransaction(data);
        saveLocalStorage(getTransactions());
        return { success: false, message: error || 'Saved locally due to a network issue' };
    }
}

export async function editTransactionData(data, id) {

    try {
        const res = await edit(data, id);
        return { success: true, message: res.message || 'Data updated successfully' };

    } catch (error) {
        return { success: false, message: error };
    }
}
export async function deleteTransactionData(id) {
    try {
        const res = await deleteData(id);
        return { success: true, message: res.message || "Transaction Delete Successfully" };
        
    } catch (error) {
        return {
            success: false,
            message: error.message || "Failed to delete transaction"
        };
    }
}