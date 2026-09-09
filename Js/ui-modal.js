 import { Add_transaction_model,TransactionForm,idReset } from "./app.js";
 export const handleOpenCloseModal = (action) => {

    if (action == 'open') {
        Add_transaction_model.classList.remove('hidden');
    } else if (action == 'close') {
        Add_transaction_model.classList.add('hidden');
        TransactionForm.reset();
        idReset();
    }

    return;
}

 export const setModalMode = (mode) => {
     if (mode == 'edit') {
        FormModalTitle.textContent = 'Edit Transaction';
        formsubmit.textContent = 'Save Changes';
    } else {
        FormModalTitle.textContent = 'Add Transaction';
        formsubmit.textContent = 'Add';
    }
}
