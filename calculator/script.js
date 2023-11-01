const btnPlus = $('#op-plus');
const btnMinus = $('#op-minus');
const btnTimes = $('#op-times');
const btnDivision = $('#op-division');
const $input = $('.input');

const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
const operators = ['+', '-', '/', '*'];

let firstOperand = "";
let operator = "";
let secondOperand = "";



function isAllSet() {
    return firstOperand !== 0 && secondOperand !== 0;
}

function updateInput(output) {
    $input.text(output);
}

function evaluate() {
    const operand1 = parseFloat(firstOperand);
    const operand2 = parseFloat(secondOperand);
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
    }
}

function isAllSet() {
    return firstOperand !== "" && operator !== "" && secondOperand !== "";
}

function instantEvaluate() {
    if (isAllSet()) {
        firstOperand = String(evaluate());
        updateInput(firstOperand);
    }
}

function operatorEventHandler(inputOperator) {
    operator = inputOperator;
}

function reset() {
    firstOperand = "";
    secondOperand = "";
    operator = "";
}

btnPlus.click(() => {
    operatorEventHandler('+');
});

btnMinus.click(() => {
    operatorEventHandler('-');
});

btnTimes.click(() => {
    operatorEventHandler('*');
});

btnDivision.click(() => {
    operatorEventHandler('/');
});

numbers.forEach(number => {
    $(`#num-${number}`).click(() => {
        if (operator === "") {
            firstOperand += number
            updateInput(firstOperand);
        } else {
            secondOperand += number;
            updateInput(secondOperand);
        }
    });
});

$('#op-equal').click(() => {
    instantEvaluate();
});

$('#decimal').click(() => {
    if (operator === "") {
        firstOperand += ".";
        updateInput(firstOperand);
    } else {
        secondOperand += ".";
        updateInput(secondOperand);
    }
});

$('#op-clean').click(() => {
    reset();
    updateInput("");
})
