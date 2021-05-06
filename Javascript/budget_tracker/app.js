// Budget Controller
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum = sum + cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      // Create new Id from last id +1
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // create new item based on 'inc' or 'exp' type
      if (type === "inc") {
        newItem = new Income(ID, des, val);
      } else if (type === "exp") {
        newItem = new Expense(ID, des, val);
      }
      // push new item to data structure
      data.allItems[type].push(newItem);
      // reutrn new element
      return newItem;
    },
    testing: function () {
      console.log(data);
    },
    calculateBudget: function () {
      //calculate total income and expenses
      calculateTotal("inc");
      calculateTotal("exp");

      // calculate the budet: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income that we spend
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    deleteItem: function (type, id) {
      var ids, index;
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculatePercentage: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function () {
      var allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },
  };
})();

// Ui Controller
var UIController = (function () {
  var DOMstrings = {
    inputType: ".sign",
    inputDesc: ".desc",
    inputAmmount: ".ammount",
    addButton: ".add",
    incomeContainer: ".income-list",
    expenseContainer: ".expense-list",
    budgetLabel: ".balance",
    incomeLabel: ".income-price",
    expenseLabel: ".expense-price",
    percentageLabel: ".expense-percentage",
    container: ".buttom",
    expPercLabel: ".per",
    dateLabel: ".budget-month",
  };
  var formatNumber = function (no, typ) {
    var numSplit, int, dec, num, type, sign;
    num = no;
    type = typ;
    // + or - before a number and comma seperation
    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, 1) + "," + int.substr(1, 3);
    }
    dec = numSplit[1];

    type === "exp" ? (sign = "-") : (sign = "+");
    return sign + " " + int + "." + dec;
  };
  var nodeListForEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        desc: document.querySelector(DOMstrings.inputDesc).value,
        ammount: parseFloat(document.querySelector(DOMstrings.inputAmmount).value),
      };
    },
    deleteListItem: function (selector_id) {
      var element = document.getElementById(selector_id);
      element.parentNode.removeChild(element);
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder test
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          "<div class='list' id='inc-%id%'><div class='desc'>%description%</div><div class='income'><span class='price'>%value%&nbsp;</span><button class='del hidden'><i class='icon'>Del</i></button></div></div>";
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html =
          "<div class='list' id='exp-%id%'><div class='desc'>%description%</div><div class='expenses'><span class='price'>%value%&nbsp;&nbsp;</span><span class='per'>0</span><div class='dels'><button class='del hidden'>Del</button></div></div></div>";
      }
      // Replace the placeholder test with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    clearInput: function () {
      document.querySelector(DOMstrings.inputDesc).value = "";
      document.querySelector(DOMstrings.inputAmmount).value = "";
      document.querySelector(DOMstrings.inputDesc).focus();
    },
    displayBudget: function (obj) {
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(
        obj.totalExp,
        "exp"
      );
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "--";
      }
    },
    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DOMstrings.expPercLabel);

      // First call function
      nodeListForEach(fields, function (cur, index) {
        if (percentages[index] > 0) {
          cur.textContent = percentages[index] + "%";
        } else {
          cur.textContent = "--";
        }
      });
    },
    displayMonth: function () {
      var now, year, month, months;
      now = new Date();
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Auguest",
        "September",
        "October",
        "November",
        "December",
      ];
      year = now.getFullYear();
      month = months[now.getMonth()];
      document.querySelector(DOMstrings.dateLabel).textContent = month + " " + year;
    },
    changedType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType + "," + DOMstrings.inputDesc + "," + DOMstrings.inputAmmount
      );
      nodeListForEach(fields, function (cur) {
        cur.classList.toggle("red-focus");
      });
    },
  };
})();

// Global app controller
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOMstr = UICtrl.getDOMstrings();
    document.querySelector(DOMstr.addButton).addEventListener("click", ctrlAddItem);
    document.querySelector(DOMstr.inputType).addEventListener("change", UICtrl.changedType);
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
    document.querySelector(DOMstr.container).addEventListener("click", ctrlDeleteItem);
    // in starting the application. the income and expense item are not created.
    // We cannot add queryselector to the non existing dom.
    // So we use event delegation
  };

  var updateBudget = function () {
    // 1. Calculate budget
    budgetCtrl.calculateBudget();
    // 2. return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentage = function () {
    // 1. Calculate the percentage
    budgetCtrl.calculatePercentage();
    // 2. Read percentages from the budget
    var percentages = budgetCtrl.getPercentages();
    // 3. update the UI with new percentage
    UIController.displayPercentages(percentages);
  };

  var ctrlAddItem = function () {
    var input, newItem;
    // 1. get input
    input = UICtrl.getInput();

    if (input.desc !== "" && !isNaN(input.ammount) && input.ammount > 0) {
      // 2. add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.desc, input.ammount);
      //3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      //4. clear fields
      UICtrl.clearInput();
      //5. calculate and update budget
      updateBudget();

      // 6. calculate and update percentages
      updatePercentage();
    }
  };
  var ctrlDeleteItem = function (e) {
    var itemID, splitID, type, id;
    itemID = e.target.parentNode.parentNode.parentNode.id;
    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      id = parseInt(splitID[1]);
      // 1. Delte the item from datastructure
      budgetCtrl.deleteItem(type, id);

      // 2. delete item from ui
      UICtrl.deleteListItem(itemID);

      // 3. update and show the new budget
      updateBudget();
      // 4. calculate and update percentages
      updatePercentage();
    }
  };

  return {
    init: function () {
      //   console.log("Application Started");
      UICtrl.displayBudget({ budget: 0, totalInc: 0, totalExp: 0, percentage: -1 });
      setupEventListeners();
      UICtrl.displayMonth();
    },
  };
})(budgetController, UIController);

controller.init();
