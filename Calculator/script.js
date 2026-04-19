const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
    currentDisplay.innerText = currentOperand;
    if (operation != null) {
        let displayOp = operation;
        if (operation === '*') displayOp = '×';
        if (operation === '/') displayOp = '÷';
        
        previousDisplay.innerText = `${previousOperand} ${displayOp}`;
    } else {
        previousDisplay.innerText = '';
    }
}
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
}
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = current === 0 ? "Error" : prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}
function deleteNumber() {
    if (currentOperand === 'Error') {
        currentOperand = '0';
        return;
    }
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
}
function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}
numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand === 'Error') clear();
        appendNumber(button.innerText);
        updateDisplay();
    });
});
operators.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.action === 'delete') {
            deleteNumber();
        } else {
            chooseOperation(button.dataset.action);
        }
        updateDisplay();
    });
});
equalBtn.addEventListener('click', () => {
    compute();
    updateDisplay();
});
clearBtn.addEventListener('click', () => {
    clear();
    updateDisplay();
});