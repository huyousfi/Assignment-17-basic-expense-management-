const transactions =[];

const formatter = new Intl.NumberFormat("en-US", {
    style:"currency",
    currency:"USD",
    signDisplay:"always",
});

const list = document.getElementById("transcationList");
const form = document.getElementById("transactionForm");
// const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

form.addEventListener('submit', addTransaction);

function updateTotals(){
    const incomeTotal = transactions.filter((trx) => trx.type === 'income').reduce((total, trx) => total + trx.amount, 0);
    const expenseTotal = transactions.filter((trx) => trx.type === 'expense').reduce((total, trx) => total + trx.amount, 0);

    const balanceTotal = incomeTotal - expenseTotal;

    balance.textContent = formatter.format(balanceTotal).substring(1);
    income.textContent = formatter.format(incomeTotal);
    expense.textContent = formatter.format(expenseTotal * -1);
}

function renderList() {
    list.innerHTML = "";

    if(transactions.length === 0){
        status.textContent = "No transactions available.";
        return;
    }else{
        status.textContent = "";
    }


    transactions.forEach(({ id, name, amount, date, type }) => {
        const sign = 'income' === type ? 1 : -1;
        const li = document.createElement("li");

        li.innerHTML = `
        <div class="name">
            <h4>${name}</h4>
            <p>${new Date(date).toLocaleDateString()}</p>
        
        </div>
        <div class="amount ${type}">
        <span>$${formatter.format(amount * sign)}</span>
        </div>
        <div class="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(${id})" class="w-6 h-6 delete-btn">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
        `;

        list.appendChild(li);


    });

}
 renderList();
 updateTotals();

 function deleteTransaction(id){
    // alert("Delete Item");
    const index = transactions.findIndex((trx) => trx.id === id);
    transactions.splice(index, 1);

    updateTotals();
    renderList();
 }

 function addTransaction(e){
    e.preventDefault();

    const formData = new FormData(this);

    transactions.push({
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: 'on' === formData.get("type") ? "income" : "expense",
    });

    this.reset();

    updateTotals();
    
    renderList();
 }
