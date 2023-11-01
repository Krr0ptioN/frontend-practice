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
    const filteredCharactersArray = charactersArray.filter(char => char !== '.'); // Exclude dot from split characters
    const regex = new RegExp(`[${filteredCharactersArray.join('')}]`, 'g');
    return inputString.split(regex);
}
function splitExpression(inputString, charactersArray) {
    const operatorsPattern = charactersArray.map(char => `\\${char}`).join('|');
    const regex = new RegExp(`(?<=${operatorsPattern})|(?=${operatorsPattern})`, 'g');
    const parts = inputString.split(regex);

    // Combine decimal numbers that were split into separate parts
    const result = [];
    let buffer = "";

    for (const part of parts) {
        if (part.match(/[0-9.]/)) {
            // If the part is a digit or a dot, add it to the buffer
            buffer += part;
        } else {
            // If the part is an operator, push the buffer (which may contain a decimal number) to the result
            if (buffer) {
                result.push(buffer);
                buffer = "";
            }
            result.push(part);
        }
    }

    // Push any remaining buffer content to the result
    if (buffer) {
        result.push(buffer);
    }

    return result;
}

function getLastOperande() {
    const operandes = splitStringByCharacters(expression, operators);
    return operandes[operandes.length - 1];
}

function isOperandTwo() {
    const operandes = splitStringByCharacters(expression, operators);
    return operandes.length === 2;
}

function updateInput(output) {
    $input.text(output);
}

function evaluate(expression) {
    const parsed = splitExpression(expression, operators);
    console.log(parsed);
    const operand1 = parseFloat(parsed[0]);
    const operand2 = parseFloat(parsed[2]);
    switch (parsed[1]) {
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

function instantEvaluate() {
    expression = String(evaluate(expression));
    updateInput(expression);
}

function operatorEventHandler(operator) {
    if (isOperatorIsLast()) {
        alterOperator(operator);
    } else {
        if (isOperandTwo()) {
            instantEvaluate();
            express(operator);
        } else {
            express(operator);
        }
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

$('#op-equal').click(() => {
    instantEvaluate();
});

$('#decimal').click(() => {
    const lastChar = expression.slice(-1);
    if (lastChar !== '.' && !lastChar.match(/[+\-*/.]/)) {
        express('.');
        updateInput(getLastOperande() + '.');
    }
});

$('#op-clean').click(() => {
    expression = "";
    updateInput("");
})
