
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
    const regex = new RegExp(`[${charactersArray.join('')}]`, 'g');
    return inputString.split(regex);
}

function getLastOperande() {
    const operandes = splitStringByCharacters(expression, operators);
    return operandes[operandes.length - 1];
}

function updateInput() {
    $input.text(getLastOperande());
}

numbers.forEach(number => {
    $(`#num-${number}`).click(() => {
        express(number);
        updateInput();
    });
});


btnPlus.click(() => {
    isOperatorIsLast() ? alterOperator('+') : express('+');
});

btnMinus.click(() => {
    isOperatorIsLast() ? alterOperator('-') : express('-');
});

btnTimes.click(() => {
    isOperatorIsLast() ? alterOperator('*') : express('*');
});

btnDivision.click(() => {
    isOperatorIsLast() ? alterOperator('/') : express('/');
});
