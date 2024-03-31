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

let isNewCalculation = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";

const answerBox = document.querySelector(".answer-box");
answerBox.style.cssText = "font-size: 100px; text-align: right;"
const numberButtons = document.querySelectorAll(".numbers-container button");
const operationButtons = document.querySelectorAll(".operations-container button");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (isNewCalculation) {
            isNewCalculation = false;
            answerBox.textContent = "";
        }
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
            if (answerBox.textContent != "" && isNewCalculation == false) {
                operator = button.textContent;
                button.style.cssText = "background-color: red;";
            }
        }
    })
})

const equalsButton = document.querySelector(".maintenance-container #equals");
equalsButton.addEventListener("click", () => {
    let equation = answerBox.textContent;
    let operator;
    let operands;
    for (const operation in operationsObject) {
        if (equation.includes(operation)) {
            operator = operation;
            operands = equation.split(operator);
        }
    }
    let result = operate(operator, +operands[0], +operands[1]);
    answerBox.textContent = result;
    isNewCalculation = true;
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
})