import {getTransactions} from './state.js';

export const renderCategoryWidget = (Transaction_arr,categoryStatsContainer) => {
    //find the of income of current Month
    //then get category with their total amount , also peracentage
    categoryStatsContainer.innerHTML = '';
    const currentMonth = new Date().toISOString().slice(0, 7);
    let IncomeAmount = getDataByType();
    let expenseItem = Transaction_arr.filter(item => {
        if (item.date.startsWith(currentMonth) && item.type == 'expense') {
            return true;
        }
    });
    let categoryMap = expenseItem.reduce((acc, item) => {
        const cag = item.category;

        if (!acc[cag]) {
            acc[cag] = {
                transaction: [],
                totalAmount: 0,
                percentage: 0,
            };
        }
        acc[cag].transaction.push(item);
        acc[cag].totalAmount += Number(item.amount);
        acc[cag].percentage = Math.floor((acc[cag].totalAmount / Number(IncomeAmount.income)) * 100);

        return acc;
    }, {})//Start acc as an empty object.

    Object.entries(categoryMap).forEach(([category, details]) => {
        let list = `<div class="category-item" data-category="${category}" id="${category}-food">
                        <div class="category-row">
                            <span class="category-name">${category.toUpperCase()}</span>
                            <span class="category-amount" id="cat-amount-${category}">₹${details.totalAmount}</span>
                        </div>
                        <div class="progress-bar" role="progressbar" aria-valuenow="${details.percentage}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-fill progress-${category}" id="cat-bar-${category}" style="width: ${details.percentage}%"></div>
                        </div>
                    </div>`
        categoryStatsContainer.insertAdjacentHTML('beforeend', list);
    });
}

export const renderMonthlyChartWidget = (Transaction_arr,monthlyChartContainer) =>{
    monthlyChartContainer.innerHTML = '';
    let monthOverViewMap = Transaction_arr.reduce((acc,item)=>{
        let itemTye = item.type;
        const month = Number(item.date.split("-")[1]);
        const monthName = new Date(2000,month - 1).toLocaleString("default", {month:"long"});
       if(!acc[monthName]){
            acc[monthName] = {
                income:0,
                expense:0,
                incomePercentage:0,
                expensePercentage :0
            }
       }
        acc[monthName][itemTye] += Number(item.amount);
        // const total = acc[monthName].income + acc[monthName].expense;
        // acc[monthName].incomePercentage = Math.floor((acc[monthName].income / total) * 100);
        //  acc[monthName].expensePercentage = Math.floor((acc[monthName].expense / total) * 100);
       return acc;
    },{});
 
    Object.values(monthOverViewMap).forEach((month)=>{
            const total = month.income + month.expense;
            month.incomePercentage = Math.floor((month.income / total) * 100);
            month.expensePercentage = Math.floor((month.expense / total) * 100);
    })
    Object.entries(monthOverViewMap).reverse().forEach(([key,item]) => {
        let list = `
         <div class="chart-bar-group" data-month="${key}">
                    <div class="bar-group-bars">
                        <div class="bar bar-income" id="bar-income-Apr" style="height: ${item.incomePercentage}%"></div>
                    <div class="bar bar-expense" id="bar-expense-Apr" style="height: ${item.expensePercentage}%"></div>
                </div>
                <span class="bar-label">${key}</span>
            </div>`

        monthlyChartContainer.insertAdjacentHTML('beforeend', list);
    })
}
const getDataByType = () =>{
    const monthYear = new Date().toISOString().slice(0, 7);

    let income_amount = getTransactions().filter(item => {
        return item.date.startsWith(monthYear) && item.type === 'income';
    }).map(item => Number(item.amount));

    let expense_amount = getTransactions().filter(item => {
        return item.date.startsWith(monthYear) && item.type === 'expense';
    }).map(item => Number(item.amount));

    return {
        income : income_amount,
        expense : expense_amount
    }

}