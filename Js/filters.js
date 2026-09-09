let filters = {
    search_name: null,
    category: null,
    type: null,
    from: null,
    to: null,
    sort: null,
}
const applyFilters = (filterKey, filterValue) => {
    let isMatched = false;
    Transaction_arr = [...originalTransaction_arr];
    filters[filterKey] = filterValue;

    //Object.entries(filters)//array of key-value pairs
    //every() → ALL must be true
    //some()  → AT LEAST ONE must be true
    const filteredData = Transaction_arr.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
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
        Transaction_arr = filteredData;
        isMatched = true;
    } else {
        handleEmptyState('show');
        document.querySelector('.empty-state-title').textContent = 'No Matching Record Found !';
        emptyAddTransactionBtn.classList.add('hidden');
        transactionsListContainer.innerHTML = '';
        isMatched = false;
    }
    if (isMatched) renderTransactionList();
}

export default applyFilters;