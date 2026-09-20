import categorySVGS from './config.js';
import applyFilters from './filters.js';
import {getLocalStorage,saveLocalStorage} from './storage.js';
import {renderTransactionList,updateSummaryCards} from './ui-render.js';
import {handleOpenCloseModal,setModalMode} from './ui-modal.js';
import {renderCategoryWidget,renderMonthlyChartWidget} from './ui-widgets.js';
import {getTransactions,getTransactionById,addTransaction,updateTransaction, removeTransaction , FillForm,Transaction_arr} from './state.js';
import {loadTransactions,addTransactionData} from './worker.js';

//Modal
export const Add_Transaction = document.getElementById('addTransactionBtn');
export const Add_transaction_model = document.getElementById('addTransactionModal');
const close_modal = document.querySelector('#close_modal');
const cancel_btn = document.querySelector('#cancel_btn');
export const formsubmit = document.getElementById('formsubmit');
export const FormModalTitle = document.getElementById('FormModalTitle');
export const TransactionForm = document.getElementById('addTransactionForm');
export const transactionsListContainer = document.getElementById('transactionsList');
export const emptyState = document.getElementById('emptyState');
export const emptyAddTransactionBtn = document.getElementById('emptyAddTransactionBtn');
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
document.addEventListener('DOMContentLoaded',  async () => {
    loadTransactions();
    globalUpate();

});
TransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    let editID = transactionId.value;
    if (editID) {
        let editTransaction = getTransactionById(editID);
        if (editTransaction) {
            Object.assign(editTransaction, data);
        }
    } else {
        data.id = crypto.randomUUID();//UUID (Universally Unique Identifier).
        addTransactionData(data);
    }
    idReset();
    TransactionForm.reset();
    handleOpenCloseModal('close');
    globalUpate();
});

window.edit = function (id) {
    let editData = updateTransaction(id);
    if (editData) {
        handleOpenCloseModal('open');
        setModalMode('edit');
        FillForm(TransactionForm, editData);
    }
}
window.Delete = function (id) {
        let userConfirmed = confirm('Are you sure want to delete this Transaction ?');
        if (userConfirmed) {
            let result = removeTransaction(id);
            if (result) {
                globalUpate();
                saveLocalStorage(getTransactions());
            }
        }

 }
export const idReset = () => {
    transactionId.value = null;
}

export function globalUpate(){
    renderTransactionList(getTransactions(),transactionsListContainer);
    updateSummaryCards(getTransactions(),cardElements);
    renderCategoryWidget(getTransactions(),categoryStatsContainer);
    renderMonthlyChartWidget(getTransactions(),monthlyChartContainer);   
}
searchTransactions.addEventListener('input', (e) => {
    applyFilters(e.target.value, 'search_name');
})
categoryFilter.addEventListener('change', () => {//Arrow functions do not have their own this They inherit 'this' from the surrounding scope, so this.value may be undefined.
    applyFilters(categoryFilter.value, 'category');
});
typeFilter.addEventListener('change', () => {
    applyFilters(typeFilter.value, 'type');
})
dateFrom.addEventListener('change', () => {
    applyFilters(dateFrom.value, 'from');
})
dateTo.addEventListener('change', () => {
    applyFilters(dateTo.value, 'to');
})
sortFilter.addEventListener('change', () => {
    applyFilters(sortFilter.value, 'sort');
})

Add_Transaction.addEventListener('click', () => {
    setModalMode('add')
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
