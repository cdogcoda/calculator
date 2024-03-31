// TOP's pseudocode steps
// Create functions that will represent each of the basic operations in the calculator
// -> These operations are functions like adding, subtracting, etc
// Create a function operate that takes an operator {string} and two numbers {number} as input
// -> The function should be able to call to the set of operation functions that we create
// Create the UI for the calculator
// -> No need to connect JS to the setup yet
// -> Fill up the calculator with dummy numbers and a clear button to ensure it looks right
// Create a function to display the result of a calculation
// Assign an event listener to the equals button such that when clicked, it calls the function operate and displays the result

let operationsObject = {
    "+": (firstNum, secondNum) => firstNum + secondNum,
    "-": (firstNum, secondNum) => firstNum - secondNum,
    "*": (firstNum, secondNum) => firstNum * secondNum,
    "/": (firstNum, secondNum) => firstNum / secondNum,
}


function operate(operator, firstNum, secondNum) {
    for (const operation in operationsObject) {
        if (operator == operation) {
            return Math.round(operationsObject[operation](firstNum, secondNum) * 1000) / 1000;
        }
    }
}

function displayResult() {
    result = operate(operator, +firstOperand, +secondOperand);
    if (result) {
        answerBox.textContent = result;
    }
    firstOperand = "";
    operator = "";
    secondOperand = "";
    operationButtons.forEach((button) => {
        button.style.cssText = "";
    })
}

let firstOperand = "";
let secondOperand = "";
let operator = "";
let result;

const answerBox = document.querySelector(".answer-box");
answerBox.style.cssText = "font-size: 100px; text-align: right;"
const numberButtons = document.querySelectorAll(".numbers-container button");
const operationButtons = document.querySelectorAll(".operations-container button");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!operator) {
            firstOperand += button.textContent;
            answerBox.textContent = firstOperand;
        } else {
            secondOperand += button.textContent;
            answerBox.textContent = secondOperand;
        }
        
    })
})
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operator.length == 0) {
            firstOperand = answerBox.textContent;
            if (answerBox.textContent != "") {
                operator = button.textContent;
                button.style.cssText = "background-color: red;";
            }
        } else {
            displayResult();
            firstOperand = answerBox.textContent;
            operator = button.textContent;
            button.style.cssText = "background-color: red;";
        }
    })
})

const equalsButton = document.querySelector(".maintenance-container #equals");
equalsButton.addEventListener("click", () => {
    displayResult();
})

const clearButton = document.querySelector(".maintenance-container #clear");
clearButton.addEventListener("click", () => {
    answerBox.textContent = "";
})

const deleteButton = document.querySelector(".maintenance-container #delete");
deleteButton.addEventListener("click", () => {
    let answerBoxContentList = answerBox.textContent.split("");
    answerBoxContentList.pop();
    answerBox.textContent = answerBoxContentList.join("");
    if (operator && secondOperand == "") {
       firstOperand = answerBox.textContent;
        operator = "";
        operationButtons.forEach((button) => {
            button.style.cssText = "";
        }) 
    } else {
        secondOperand = answerBox.textContent;
    }
    
})