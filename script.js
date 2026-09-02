document.addEventListener('DOMContentLoaded', () => {
    console.log('The DOM is fully loaded and parsed!');
    GetLocalStorage();
    renderTransactionList();
})

const Add_Transaction = document.getElementById('addTransactionBtn');
const Add_transaction_model = document.getElementById('addTransactionModal');
const close_modal = document.querySelector('#close_modal');
const cancel_btn = document.querySelector('#cancel_btn');
const formsubmit = document.getElementById('formsubmit');
const TransactionForm = document.getElementById('addTransactionForm');
const transactionsListContainer = document.getElementById('transactionsList');
const emptyState = document.getElementById('emptyState');
const emptyAddTransactionBtn = document.getElementById('emptyAddTransactionBtn');

let Transaction_arr = [];
TransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    data.id = crypto.randomUUID();//UUID (Universally Unique Identifier).
    Transaction_arr.push(data);

    TransactionForm.reset();
    handleOpenCloseModal('close');
    renderTransactionList();
    SaveLocalStorage();
});
const renderTransactionList = () => {
    transactionsListContainer.innerHTML = '';
    if (Transaction_arr.length == 0) {
        emptyState.classList.remove('hidden');
        Add_Transaction.classList.add('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
        Add_Transaction.classList.remove('hidden');
    }
    Transaction_arr.forEach((item, index) => {
        let id = item.id || null;
        let title = item.title || null;
        let category = item.category || '';
        let data = item.date;
        let type = item.type;
        let amount = item.amount;
        let svg = categorySVGS(category);
        let html = ` 
        <div class="transaction-row" data-transaction-id=${index}>
            <div class="transaction-cell transaction-icon-cell">
                <span class="transaction-icon ${category}-category-icon ${category}-icon" aria-hidden="true">
                ${svg.svg}
                </span>
            </div>
            <div class="transaction-cell transaction-details">
                <p class="transaction-title">${title}</p>
                <p class="transaction-category">${category}</p>
            </div>
            <div class="transaction-cell transaction-date-mobile">
                <span class="mobile-label">Date</span>
                <span class="transaction-date">${data}</span>
            </div>
            <div class="transaction-cell transaction-amount-cell">
                <span class="transaction-amount ${type}-amount-text">${type == 'income' ? '+' : '-'}₹${amount}</span>
                <span class="transaction-type-badge type-${type}">${type || 'income'}</span>
            </div>
            <div class="transaction-cell transaction-actions">
                <button class="action-btn edit-btn" onclick="handleEditTransaction('${id}')" aria-label="Edit transaction" data-edit-id=${index}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="action-btn delete-btn" aria-label="Delete transaction" data-delete-id=${id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        </div>`;
        transactionsListContainer.insertAdjacentHTML("beforeend", html);
    });
}

const categorySVGS = (type) => {
    let svgs = [
        { type: 'food', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>' },
        { type: 'travel', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="17" r="2"></circle><circle cx="19" cy="17" r="2"></circle><path d="M19 17H5v-5l-1-4h16l-1 4v5z"></path><line x1="7.5" y1="9" x2="17" y2="9"></line></svg>' },
        { type: 'shopping', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>' },
        { type: 'salary', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line><line x1="6" y1="15" x2="10" y2="15"></line></svg>' },
        { type: 'bills', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>' }
    ]
    let match_svg = svgs.find((item) => item.type === type);
    return match_svg;
}
const FormModalTitle = document.getElementById('FormModalTitle');
function handleEditTransaction(id){
    let editData = Transaction_arr.find((data) => data.id === id);
    console.log(editData);
    handleOpenCloseModal('open');
    FormModalTitle.textContent = 'Edit Transaction';
    formsubmit.textContent = 'Save Changes';


}










const SaveLocalStorage = () => {
    localStorage.setItem('myTransactions', JSON.stringify(Transaction_arr));
    return true;
};
const GetLocalStorage = () => {
    let saveData = JSON.parse(localStorage.getItem('myTransactions'));
    if (Array.isArray(saveData)) {
        Transaction_arr.push(...saveData);
    }
}


























Add_Transaction.addEventListener('click', () => {
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
const handleOpenCloseModal = (action) => {

    if (action == 'open') {
        Add_transaction_model.classList.remove('hidden');
    } else if (action == 'close') {
        Add_transaction_model.classList.add('hidden');
    }

    return;
}