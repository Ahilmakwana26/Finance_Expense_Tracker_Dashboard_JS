import {getTransactions,originalTransaction_arr,setTransactions} from './state.js';
import {emptyAddTransactionBtn,transactionsListContainer} from './app.js';
import {renderTransactionList} from './ui-render.js';
import { toggleEmptyState } from './ui-modal.js';

let filters = {
    search_name: null,
    category: null,
    type: null,
    from: null,
    to: null,
    sort: null,
}
const applyFilters = (filterValue, filterKey) => {
    let isMatched = false;
    setTransactions(originalTransaction_arr);
    filters[filterKey] = filterValue;

    //Object.entries(filters)//array of key-value pairs
    //every() → ALL must be true
    //some()  → AT LEAST ONE must be true
    const filteredData = getTransactions().filter(item => {
        return Object.entries(filters).every(([key, value]) => {
           // console.log(key,value)
            if (!value || value === "All" || key === 'sort') return true;
            if (key === 'search_name' && value != '') {
                return item.title.toLowerCase().includes(value.toLowerCase());
            }
            if (key === 'from' && value != '') {
                return Date.parse(item.date) >= Date.parse(value);//15-09-2026 >= 10-09-2026
            }
            if (key === 'to' && value != '') {
                return Date.parse(item.date) <= Date.parse(value);//15-09-2026 <= 20-09-2026
            }
            return item[key] === value;
        });
    });
    if (filteredData.length > 0) {
        setTransactions(filteredData);
        isMatched = true;
    } else {
        toggleEmptyState('show');
        document.querySelector('.empty-state-title').textContent = 'No Matching Record Found !';
        emptyAddTransactionBtn.classList.add('hidden');
        transactionsListContainer.innerHTML = '';
        isMatched = false;
    }
    if (isMatched) renderTransactionList(getTransactions(),transactionsListContainer);
}

export default applyFilters;