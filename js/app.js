class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

    //function declrations in es6
    //SUBMIT BUDGET METHOD
    submitBudgetForm(){ //function 1*
      console.log(`hello from es6`);
    }

  
}
//add methods to event listener
//selects 3 things
    function eventListeners(){
    const budgetForm = document.getElementById(`budget-form`);
    const expenseForm = document.getElementById(`expense-form`);
    const expenseList = document.getElementById(`expense-list`);

//new instance if UI CLASS
const ui = new UI()

//budget form submit
budgetForm.addEventListener(`submit`, function(event){ 
  event.preventDefault(); //implemented to automatically submit form 
  ui.submitBudgetForm(); //this recalls function 1*
})

//expense form submit
expenseForm.addEventListener(`submit`, function(event){
  event.preventDefault();
})

//expense click
expenseList.addEventListener(`submit`, function(event){

})



  }

  document.addEventListener(`DOMContentLoaded`, function(){ //call back function
    eventListeners(); //this recalls the above eventListeners() function
  })

