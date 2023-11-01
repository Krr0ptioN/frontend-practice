
const btnPlus = $('#op-plus');
const btnMinus = $('#op-minus');
const btnTimes = $('#op-times');
const btnDivision = $('#op-division');
const $input = $('.input');

const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
const operators = ['+', '-', '/', '*'];
let expression = "";


function express(n) {
    expression += n;
}

function isOperatorIsLast() {
    return operators.includes(expression.slice(-1));
}

function alterOperator(op) {
    expression = expression.slice(0, -1) + op;
}

function splitStringByCharacters(inputString, charactersArray) {
    console.log(inputString, charactersArray);
    const regex = new RegExp(`[${charactersArray.join('')}]`, 'g');
    return inputString.split(regex);
}


function splitExpression(inputString, charactersArray) {
    const operatorsPattern = charactersArray.map(char => `\\${char}`).join('|');
    const regex = new RegExp(`(?<=${operatorsPattern})|(?=${operatorsPattern})`, 'g');
    return inputString.split(regex).filter(part => part !== '');
}


function getLastOperande() {
    const operandes = splitStringByCharacters(expression, operators);
    return operandes[operandes.length - 1];
}

function isOperandTwo() {
    const operandes = splitStringByCharacters(expression, operators);
    return operandes.length == 2 ? true : false;
}

function updateInput(output) {
    $input.text(output);
}

numbers.forEach(number => {
    $(`#num-${number}`).click(() => {
        if (isOperatorIsLast()) {
            express(number);
            updateInput(number);
        } else {
            express(number);
            updateInput(expression);
        }
    });
});

function evaluate(expression) {
    const parsed = splitExpression(expression, operators);
    // Second item is always operator
    switch (parsed[1]) {
        case '+':
            return Number(parsed[0]) + Number(parsed[2]);
        case '-':
            return Number(parsed[0]) - Number(parsed[2]);
        case '*':
            return Number(parsed[0]) * Number(parsed[2]);
        case '/':
            return Number(parsed[0]) / Number(parsed[2]);
    }
}

function instantEvaulate() {
    // Global expression
    expression = String(evaluate(expression));
    updateInput(expression);
}

function operatorEventHandler(operator) {
    if (isOperatorIsLast()) {
        alterOperator(operator)
    } else {
        if (isOperandTwo()) {
            instantEvaulate();
            express(operator);
        } else express(operator);
    }
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

$('#op-equal').click(() => {
    console.log(expression);
    instantEvaulate();
    console.log(expression);
});
