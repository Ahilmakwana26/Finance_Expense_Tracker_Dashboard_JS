import categorySVGS from './config.js';
import applyFilters from './filters.js';
import {getLocalStorage,saveLocalStorage} from './storage.js';
import {renderTransactionList,updateSummaryCards,toggleEmptyState } from './ui-render.js';
import {handleOpenCloseModal,setModalMode} from './ui-modal.js';
import {renderCategoryWidget,renderMonthlyChartWidget} from './ui-widgets.js';
import {getTransactions,setTransactions,addTransaction,updateTransaction,removeTransaction,resetTransactions} from './state.js';
import {Transaction_arr,setOriginalTransactions} from './state.js';



//Modal
export const Add_Transaction = document.getElementById('addTransactionBtn');
export const Add_transaction_model = document.getElementById('addTransactionModal');
const close_modal = document.querySelector('#close_modal');
const cancel_btn = document.querySelector('#cancel_btn');
const formsubmit = document.getElementById('formsubmit');
export const TransactionForm = document.getElementById('addTransactionForm');
const transactionsListContainer = document.getElementById('transactionsList');
export const emptyState = document.getElementById('emptyState');
const emptyAddTransactionBtn = document.getElementById('emptyAddTransactionBtn');
const transactionId = document.getElementById('transactionId');
const categoryStatsContainer = document.getElementById('categoryStatsContainer');
const monthlyChartContainer = document.querySelector('#monthlyChartContainer .chart-bars');

//Cards
const totalBalance = document.querySelector('.balance-card #totalbalance');
const totalbalance_percentage = document.querySelector('.balance-card #totalbalance_percentage');
const totalIncome = document.getElementById('totalIncome');
const totalExpanse = document.getElementById('totalExpanse');
const totalSaving = document.getElementById('totalSaving');

let cardElements = {
    totalBalance:totalBalance,
    totalbalance_percentage:totalbalance_percentage,
    totalIncome:totalIncome,
    totalExpanse:totalExpanse,
    totalSaving:totalSaving,
 }
//Filters
const searchTransactions = document.getElementById('searchTransactions');
const categoryFilter = document.getElementById('categoryFilter');
const typeFilter = document.getElementById('typeFilter');
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');
const sortFilter = document.getElementById('sortFilter');

document.addEventListener('DOMContentLoaded', () => {
    console.log('The DOM is fully loaded and parsed!');
    getLocalStorage();
    globalUpate();

})

TransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    let editID = transactionId.value;
    if (editID) {
        let editTransaction = getTransactionData(editID);
        if (editTransaction) {
            Object.assign(editTransaction, data);
        }
    } else {
        data.id = crypto.randomUUID();//UUID (Universally Unique Identifier).
        Transaction_arr.push(data);
    }
    idReset();
    TransactionForm.reset();
    handleOpenCloseModal('close');
    saveLocalStorage(Transaction_arr);
    globalUpate();
});

const FormModalTitle = document.getElementById('FormModalTitle');

function handleEditTransaction(id) {

    let editData = getTransactionData(id);
    handleOpenCloseModal('open');
    formModalReset('edit');
    FillForm(TransactionForm, editData);
}

function deleteTransaction(id) {
    let deleteTran_inx = Transaction_arr.findIndex(item => item.id === id);
    let userConfirmed = confirm('Are you sure want to delete this Transaction ?');
    if (deleteTran_inx && userConfirmed) {
        Transaction_arr.splice(deleteTran_inx, 1);
        renderTransactionList();
        SaveLocalStorage();
        UpdateCards();
    }
}
function getTransactionData(id) {
    return Transaction_arr.find((data) => data.id === id)
}

export const idReset = () => {
    transactionId.value = null;
}

export function globalUpate(){
    renderTransactionList(Transaction_arr,transactionsListContainer);
    updateSummaryCards(Transaction_arr,cardElements);
    renderCategoryWidget(Transaction_arr,categoryStatsContainer);
    renderMonthlyChartWidget(Transaction_arr,monthlyChartContainer);
}
searchTransactions.addEventListener('input', (e) => {
    handleSearch(e.target.value, 'search_name');
})
categoryFilter.addEventListener('change', () => {//Arrow functions do not have their own this They inherit 'this' from the surrounding scope, so this.value may be undefined.
    handleSearch(categoryFilter.value, 'category');
});
typeFilter.addEventListener('change', () => {
    handleSearch(typeFilter.value, 'type');
})
dateFrom.addEventListener('change', () => {
    handleSearch(dateFrom.value, 'from');
})
dateTo.addEventListener('change', () => {
    handleSearch(dateTo.value, 'to');
})
sortFilter.addEventListener('change', () => {
    handleSearch(sortFilter.value, 'sort');
})

Add_Transaction.addEventListener('click', () => {
    formModalReset('add');
    handleOpenCloseModal('open');
});
emptyAddTransactionBtn.addEventListener('click', () => {
    handleOpenCloseModal('open');
})
close_modal.addEventListener('click', () => {
    handleOpenCloseModal('close');
});
cancel_btn.addEventListener('click', () => {
    handleOpenCloseModal('close');
});
 export const formModalReset = (mode) => {
    if (mode == 'edit') {
        FormModalTitle.textContent = 'Edit Transaction';
        formsubmit.textContent = 'Save Changes';
    } else {
        FormModalTitle.textContent = 'Add Transaction';
        formsubmit.textContent = 'Add';
    }
}
