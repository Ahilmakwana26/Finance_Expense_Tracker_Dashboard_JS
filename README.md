The user wants to understand how to use this Personal Finance Dashboard as a real-world example, specifically with a ₹20,000 monthly salary. This is an educational/explanatory question - they want me to walk them through a practical scenario of how the dashboard would work.

I don't need to write code or invoke any skills. I just need to provide a clear, step-by-step explanation of how this dashboard would be used with a ₹20,000 salary example.
Great question! Let me walk you through a **practical, real-life example** of how you would use this FinTrack dashboard with a **₹20,000 per month salary**. This will help you understand every part of the UI.

---

## 💰 Real Scenario: Monthly Salary = ₹20,000

Let's say you receive **₹20,000 on the 1st of every month** as your salary. Here's how the dashboard tracks everything:

---

### Step 1: Income Added → Summary Cards Update

When you receive your salary, you **Add Transaction**:

| Field | Value |
|---|---|
| Title | September Salary |
| Amount | 20,000 |
| Type | **Income** |
| Category | Salary |
| Date | Sep 01, 2026 |

After adding, the **Summary Cards** at the top show:

```
┌─────────────────────────────────────────────────────────┐
│  Total Balance     │  Income      │  Expenses   │ Savings│
│  ₹20,000           │  ₹20,000     │  ₹0         │ ₹20,000│
│  +from last month  │  +% change   │  -% change  │ +%     │
└─────────────────────────────────────────────────────────┘
```

These cards are in the [summary-section](file:///d:/Ahil/JavaScript/JS_PROJECT/index.html#L135-L243) of index.html — later you'll connect JavaScript to calculate these dynamically.

---

### Step 2: Add Your Monthly Expenses

Now, as you spend money throughout the month, you **Add Transaction** for each expense:

#### Example expenses for September:

| # | Title | Amount | Type | Category | Date |
|---|---|---|---|---|---|
| 1 | House Rent | ₹8,000 | Expense | Bills | Sep 02 |
| 2 | Groceries | ₹2,500 | Expense | Food | Sep 03 |
| 3 | Bus Pass | ₹1,000 | Expense | Travel | Sep 03 |
| 4 | Phone Bill | ₹500 | Expense | Bills | Sep 05 |
| 5 | Lunch (office) | ₹1,200 | Expense | Food | Sep 10 |
| 6 | Movie + Snacks | ₹800 | Expense | Entertainment | Sep 14 |
| 7 | New Shoes | ₹2,000 | Expense | Shopping | Sep 20 |
| 8 | Weekend Trip | ₹1,500 | Expense | Travel | Sep 25 |

---

### Step 3: Now Your Dashboard Looks Like This

#### 📊 Summary Cards (updated):

```
Total Balance:  ₹2,500      (20,000 − 17,500 spent)
Total Income:   ₹20,000     (salary only)
Total Expenses: ₹17,500     (sum of all 8 expenses)
Savings:        ₹2,500      (Income − Expenses)
```

#### 📋 Recent Transactions List
The [transactions list](file:///d:/Ahil/JavaScript/JS_PROJECT/index.html#L300-L489) shows all 9 entries (1 income + 8 expenses) with:
- **Green (+₹)** for salary (income)
- **Red (−₹)** for each expense
- Category-colored icons (orange for food, blue for travel, etc.)
- Edit ✏️ and Delete 🗑️ buttons if you make a typo

#### 📈 Spending by Category (Progress Bars)
In the [statistics card](file:///d:/Ahil/JavaScript/JS_PROJECT/index.html#L500-L559), horizontal bars show:

```
Bills          ████████████████████   ₹8,500  (48.6% of expenses)
Food           ████████████           ₹3,700  (21.1%)
Travel         █████████              ₹2,500  (14.3%)
Shopping       ███████                ₹2,000  (11.4%)
Entertainment  ███                    ₹800    ( 4.6%)
```

This tells you: **"Whoa! 49% of my money goes to bills. Can I reduce rent or find a cheaper phone plan?"**

#### 📉 Monthly Overview (Bar Chart)
The [CSS bar chart](file:///d:/Ahil/JavaScript/JS_PROJECT/index.html#L564-L639) compares income vs. expenses across months:

```
        Apr   May   Jun   Jul   Aug   Sep
Income  ███   ███   ███   ███   ███   ████   (always ₹20k salary)
Expense ██    ██    ███   ██    ███   ████   (varies by month)
```

If September expenses are higher, you see the red bar getting taller and think: **"Next month I need to cut down on shopping!"**

---

### Step 4: Using Search, Filters, and Sort

The [filter controls](file:///d:/Ahil/JavaScript/JS_PROJECT/index.html#L254-L299) above the transaction list help you answer questions like:

| Question | What you do |
|---|---|
| "How much did I spend on food?" | 🍔 Category dropdown → "Food" |
| "Show only my salary credits" | 💰 Type dropdown → "Income" |
| "What did I buy on Sep 20?" | 📅 Date filter → pick date |
| "What was my biggest expense?" | ↕ Sort → "Amount High" |
| "Find that movie ticket transaction" | 🔍 Search → type "movie" |

---

### Step 5: Savings Reality Check with ₹20k Salary

```
Income:    ₹20,000  (100%)
Expenses:  ₹17,500  ( 87.5%)
──────────────────────────
Savings:   ₹ 2,500  ( 12.5%)
```

The dashboard makes this **visually obvious** — you can see at a glance if you're on track. If you want to save more (say ₹5,000/month), you know you need to cut ₹2,500 somewhere (maybe skip the shoes next month! 👟❌).

---

### 🔮 How JavaScript Will Connect Later

Right now everything is **static HTML/CSS**. When you add JavaScript, you'll make it alive:

| Part of Dashboard | What JavaScript Does |
|---|---|
| Add Transaction Modal | Opens when you click "+ Add Transaction", saves data |
| Edit Transaction Modal | Opens when you click ✏️, updates existing entry |
| Delete Button | Removes a transaction when you click 🗑️ |
| Summary Cards | Auto-calculates: `sum(income)`, `sum(expenses)`, `balance = income − expenses` |
| Search/Filter/Sort | Hides/shows matching transactions instantly |
| Category Progress Bars | Calculates % of total spending per category |
| LocalStorage | Saves all data so it's still there when you refresh the page |
| Empty State | Shows "No transactions yet" if you delete everything |

---

### 📝 Summary: Your ₹20,000 Month at a Glance

The dashboard gives you **full visibility** over your money in 3 seconds:
- **Top cards:** "Do I have money left or am I broke?" → ₹2,500 left
- **Category bars:** "Where is it all going?" → 49% to bills
- **Bar chart:** "Am I getting better each month, or worse?"
- **Transaction list:** "What exactly did I spend on?"

The **whole point** of this UI is to help you make smarter decisions with your ₹20,000 salary — and that's exactly what a good finance tracker does! 💡