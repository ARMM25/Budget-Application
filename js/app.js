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
    this.itemID = 0; //**3 this is where we delcared id for object that contains the value  and amount of expense
  }

    //function declrations in ES6
    //submit budget method
    submitBudgetForm(){ //function 1*
      const value = this.budgetInput.value;
      if(value==='' || value < 0){
        this.budgetFeedback.classList.add("showItem");
        this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
        //since this function is pointing to this global object, we must ensure it points to local items from method above. 
        const self = this;

        setTimeout(function(){
          self.budgetFeedback.classList.remove("showItem");
        }, 4000);
      }
      else{
        this.budgetAmount.textContent = value; //2*here we are passing the value of budget only
        this.budgetInput.value = '';
        this.showBalance();
      }
    }

    //show balance method
    showBalance(){
      //call another method inside this method
      const expense = this.totalExpense();
      const total = parseInt(this.budgetAmount.textContent) -expense; //2*here we are getting it back!
      this.balanceAmount.textContent = total; //property that holds element of amount in DOM only
      if (total < 0){
        this.balance.classList.remove('showGreen', 'showBlack');
        this.balance.classList.add('showRed');
      }
      else  if (total > 0) {
        this.balance.classList.remove('showRed', 'showBlack');
        this.balance.classList.add('showGreen');
      }
      else  if (total === 0) {
        this.balance.classList.remove('showRed', 'showGreen');
        this.balance.classList.add('showBlack');
      }
    }

    //submit expense form
    submitExpenseForm(){
      const expenseValue = this.expenseInput.value;
      const amountValue = this.amountInput.value;
      if (expenseValue === '' || amountValue === '' || amountValue <0){
        this.expenseFeedback.classList.add('showItem');
        this.expenseFeedback.innerHTML = '<p>values cannot be empty or negative</p>'
      const self = this;
      setTimeout(function(){
        self.expenseFeedback.classList.remove('showItem'); //accesing instance of class
      }, 4000);
      }
      else{
        let amount = parseInt(amountValue);
        this.expenseInput.value = "";
        this.amountInput.value = "";
        
        //3** we gotta create object that contans value and amount of expense with id. 
        let expense = {
          id:this.itemID, //declared at the beginning
          title:expenseValue,
          amount:amount,
        }
        this.itemID++;
        this.itemList.push(expense);
        this.addExpense(expense) //this will point to method
        this.showBalance();//show balance
        
      }
    }
    //add expense
    addExpense(expense){
      const div = document.createElement('div'); //we gotta create a div
      div.classList.add('expense');
      div.innerHTML =
      <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>;

    this.expenselist.appendChild(div);
  }

    //total expense
    totalExpense(){
      let total = 0;
      if (this.itemList.length > 0){
        total = this.itemList.reduce(function(acc,curr){ //every time reduce runs, we loop thru array
          acc += curr.amount;
          return acc;
        },0)
      }
      this.expenseAmount.textContent = total; //if thers no list in expense then it should be zero
      return total;
    }

    //methods
    //this is for button edit expense
    editExpense(element){
      let id = parseInt(element.dataset.id);
      let parent = element.parentElement.parentElement.parentElement; //3 hops
      //remove from DOM
      this.expenseList.removeChild(parent);
      //remove from list
      let expense = this.itemList.filter(function(item){
        return item.id===id;
      })
      //show value
      this.expenseInput.value = expense[0].title;
      this.amountInput.value = expense[0].amount
      //remove from list
      let tempList = this.itemList.filter(function(item){
        return item.id !==id;
      })
      this.itemList = tempList;
      this.showBalance()
      }
    
    //this is for button delete expense
    deleteExpense(element){
      let id = parseInt(element.dataset.id);
      let parent = element.parentElement.parentElement.parentElement; //3 hops
      //remove from DOM
      this.expenseList.removeChild(parent);
      //remove from the list
      let tempList = this.itemList.filter(function(item){
        return item.id !==id;
      })
      this.itemList = tempList;
      this.showBalance()
    }
}

//add methods to event listener
//selects 3 things
    function eventListeners(){
    const budgetForm = document.getElementById(`budget-form`);
    const expenseForm = document.getElementById(`expense-form`);
    const expenseList = document.getElementById(`expense-list`);

//new instance if UI class
    const ui = new UI()

//budget form submit
  budgetForm.addEventListener(`submit`, function(event){ 
   event.preventDefault(); //implemented to automatically submit form 
    ui.submitBudgetForm(); //this recalls function 1*
})

//expense form submit
  expenseForm.addEventListener(`submit`, function(event){
   event.preventDefault();
   ui.submitExpenseForm();
})

//expense click
  expenseList.addEventListener("click", function(event){
   if (event.target.parentElement.classList.contains('edit-icon')){
      ui.editExpense(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      ui.deleteExpense(event.target.parentElement)
    }
    })
    }

   document.addEventListener(`DOMContentLoaded`, function(){ //call back function
     eventListeners(); //this recalls the above eventListener() function
   })

