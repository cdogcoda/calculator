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
            return operationsObject[operation](firstNum, secondNum);
        }
    }
}


