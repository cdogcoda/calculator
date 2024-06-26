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
    if (operator == "/" && secondNum == 0) {
        return "Error";
    } else if (isNaN(firstNum) || isNaN(secondNum)) {
        return "Error";
    }
    for (const operation in operationsObject) {
        if (operator == operation) {
            return Math.round(operationsObject[operation](firstNum, secondNum) * 1000) / 1000;
        }
    }
}

function displayResult() {
    if (!secondOperand) {
        secondOperand = firstOperand;
    } else if (firstOperand == ".") {
        firstOperand = 0;
    } else if (secondOperand == ".") {
        secondOperand = 0;
    }
    result = operate(operator, +firstOperand, +secondOperand);
    if (result || result == 0) {
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

const body = document.querySelector("body");
const answerBox = document.querySelector(".answer-box");
answerBox.style.cssText = "font-size: 100px; text-align: right;"
const numberButtons = document.querySelectorAll(".numbers-container button");
const operationButtons = document.querySelectorAll(".operations-container button");
const decimalButton = document.querySelector("#last-second");
body.addEventListener("keypress", (e) => {
    if (Number.isInteger(+e.key)) {
        if (!operator) {
            firstOperand += e.key;
            answerBox.textContent = firstOperand;
        } else {
            secondOperand += e.key;
            answerBox.textContent = secondOperand;
        }
    } else if (e.key == ".") {
        if (!operator && !answerBox.textContent.includes(".")) {
            firstOperand += e.key;
            answerBox.textContent = firstOperand;
        } else if (!answerBox.textContent.includes(".")) {
            secondOperand += e.key;
            answerBox.textContent = secondOperand;
        }
    } else if (e.key == "Enter") {
        displayResult();
    } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
        if (operator.length == 0) {
            firstOperand = answerBox.textContent;
            if (answerBox.textContent != "") {
                let button = Array.from(operationButtons).find((btn) => btn.textContent == e.key);
                operator = e.key;
                button.style.cssText = "background-color: rgba(8, 84, 114, .5);";
            }
        } else {
            displayResult();
            let button = Array.from(operationButtons).find((btn) => btn.textContent == e.key);
            firstOperand = answerBox.textContent;
            operator = e.key;
            button.style.cssText = "background-color: rgba(8, 84, 114, .5);";
        }
    } else if (e.key == "C") {
        answerBox.textContent = "";
        firstOperand = "";
        secondOperand = "";
        operator = "";
        operationButtons.forEach((button) => {
            button.style.cssText = "";
        })
    }
})

body.addEventListener("keydown", (e) => {
    if (e.key == "Backspace") {
        let answerBoxContentList = answerBox.textContent.split("");
        answerBoxContentList.pop();
        answerBox.textContent = answerBoxContentList.join("");
        if (operator && secondOperand == "") {
            firstOperand = answerBox.textContent;
            operator = "";
            operationButtons.forEach((button) => {
                button.style.cssText = "";
            }) 
        } else if (secondOperand == "") {
            firstOperand = answerBox.textContent;
        } else {
            secondOperand = answerBox.textContent;
        }
    } 
})

numberButtons.forEach((button) => {
    if (button.id == "last-second") {
        button.addEventListener("click", () => {
            if (!operator && !answerBox.textContent.includes(".")) {
                firstOperand += button.textContent;
                answerBox.textContent = firstOperand;
            } else if (!answerBox.textContent.includes(".")) {
                secondOperand += button.textContent;
                answerBox.textContent = secondOperand;
            }
        })
    } else {
        button.addEventListener("click", () => {
            if (!operator) {
                firstOperand += button.textContent;
                answerBox.textContent = firstOperand;
            } else {
                secondOperand += button.textContent;
                answerBox.textContent = secondOperand;
            }
        })
    }
})

numberButtons.forEach((button) => {
    button.addEventListener("mousedown", () => {
        button.style.cssText = "background-color: rgba(8, 84, 114, .5);";
    })
    button.addEventListener("mouseup", () => {
        button.style.cssText = "background-color: rgba(8, 84, 114);";
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operator.length == 0) {
            firstOperand = answerBox.textContent;
            if (answerBox.textContent != "") {
                operator = button.textContent;
                button.style.cssText = "background-color: rgba(8, 84, 114, .5);";
            }
        } else {
            displayResult();
            firstOperand = answerBox.textContent;
            operator = button.textContent;
            button.style.cssText = "background-color: rgba(8, 84, 114, .5);";
        }
    })
})

const equalsButton = document.querySelector(".maintenance-container #equals");

equalsButton.addEventListener("click", () => {
    displayResult();
})

equalsButton.addEventListener("mousedown", () => {
    equalsButton.style.cssText = "background-color: rgba(8, 84, 114, .5);";
})

equalsButton.addEventListener("mouseup", () => {
    equalsButton.style.cssText = "background-color: rgba(8, 84, 114);";
})

const clearButton = document.querySelector(".maintenance-container #clear");

clearButton.addEventListener("click", () => {
    answerBox.textContent = "";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    operationButtons.forEach((button) => {
        button.style.cssText = "";
    }) 
})

clearButton.addEventListener("mousedown", () => {
    clearButton.style.cssText = "background-color: rgba(8, 84, 114, .5);";
})

clearButton.addEventListener("mouseup", () => {
    clearButton.style.cssText = "background-color: rgba(8, 84, 114);";
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
    } else if (secondOperand == "") {
        firstOperand = answerBox.textContent;
    } else {
        secondOperand = answerBox.textContent;
    }
})

deleteButton.addEventListener("mousedown", () => {
    deleteButton.style.cssText = "background-color: rgba(8, 84, 114, .5);";
})

deleteButton.addEventListener("mouseup", () => {
    deleteButton.style.cssText = "background-color: rgba(8, 84, 114);";
})