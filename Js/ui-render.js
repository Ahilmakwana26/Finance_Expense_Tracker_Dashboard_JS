import {toggleEmptyState } from './ui-modal.js';
import categorySVGS from "./config.js";

export const renderTransactionList = (transactionArr, container) => {
    console.log('render', transactionArr);
    
    toggleEmptyState(transactionArr.length === 0 ? 'show' : 'hide');
    if (!container) {
        console.error('transactionsList container not found');
        return;
    }

    container.innerHTML = '';

    transactionArr.forEach((item) => {
        const id = item.id ?? '';
        const title = item.title || item.party_name || 'Untitled transaction';

        // API field
        const type = item.transaction_type || 'expense';

        // There is NO category in the API response.
        // Use transaction type as the fallback category.
        const category = item.category || type;

        const date = item.transaction_date || item.created_at || '';

        const amount = Number(item.amount) || 0;

        const paymentMethod = item.payment_method || '';
        const description = item.description || '';
        const status = item.status || '';

        const svg = categorySVGS(category);

        const html = `
            <div class="transaction-row" data-transaction-id="${id}">

                <div class="transaction-cell transaction-icon-cell">
                    <span
                        class="transaction-icon ${category}-category-icon ${category}-icon"
                        aria-hidden="true"
                    >
                        ${svg?.svg || ''}
                    </span>
                </div>

                <div class="transaction-cell transaction-details">
                    <p class="transaction-title">
                        ${title}
                    </p>

                    <p class="transaction-category">
                        ${description || paymentMethod || category}
                    </p>
                </div>

                <div class="transaction-cell">
                    <span class="mobile-label">Date</span>

                    <span class="transaction-date">
                        ${date}
                    </span>
                </div>

                <div class="transaction-cell transaction-amount-cell">

                    <span class="transaction-amount ${type}-amount-text">
                        ${type === 'income' ? '+' : '-'}₹${amount.toFixed(2)}
                    </span>

                    <span class="transaction-type-badge type-${type}">
                        ${type}
                    </span>

                </div>

                <div class="transaction-cell transaction-actions">

                    <button
                        class="action-btn edit-btn"
                        onclick="edit('${id}')"
                        aria-label="Edit transaction"
                        data-edit-id="${id}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="Delete('${id}')"
                        aria-label="Delete transaction"
                        data-delete-id="${id}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
                            <path d="M10 11v6M14 11v6"></path>
                            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>

                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', html);
    });
};



export function updateSummaryCards(Transaction_arr, { totalBalance, totalbalance_percentage, totalIncome, totalExpanse, totalSaving }) {
    let income = Transaction_arr.filter(item => item.transaction_type === 'income').reduce((acc, item) => acc + Number(item.amount), 0);
    let expence = Transaction_arr.filter(item => item.transaction_type === 'expense').reduce((acc, item) => acc + Number(item.amount), 0);
    let saving = Number(income) - Number(expence);

    totalBalance.textContent = `₹${saving}`;
    totalIncome.textContent = `₹${Number(income)}`;
    totalExpanse.textContent = `₹${Number(expence)}`;
    totalSaving.textContent = `₹${saving}`;
    //totalbalance_percentage.textContent = `${((saving / (Number(income) + Number(expence))) * 100).toFixed(2)}%`;    
}