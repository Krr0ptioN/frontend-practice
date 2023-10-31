
import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';


const choices = {
    rock: { name: "rock", defeats: ['lizard', 'scissors'] },
    paper: { name: "paper", defeats: ['rock', 'spock'] },
    scissors: { name: "scissors", defeats: ['lizard', 'paper'] },
    lizard: { name: "lizard", defeats: ['paper', 'spock'] },
    spock: { name: "spock", defeats: ['rock', 'scissors'] },
}

const actions = ["rock", "paper", "scissors", "lizard", "spock"];

const $userScore = $('#user-score');
const $computerScore = $('#computer-score');
const $gameMessage = $('#game-msg');

function computerChoiceGenerator(arr) {
    if (arr.length === 0) {
        return undefined; // Return undefined for an empty array.
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

let userScore = 0;
let computerScore = 0;

function userWin() {
    userScore++;
    return $userScore.text(userScore);
}

function computerWin() {
    computerScore++;
    return $computerScore.text(computerScore);
}


function select(user, action) {
    const $userChoice = $(`#${user}-${action}`);
    $userChoice.addClass('selected');
}

function unselect(user, action) {
    const $userChoice = $(`#${user}-${action}`);
    $userChoice.removeClass('selected');
}

let userChoice = "";
let computerChoice = "";

function clearSelectedChoices() {
    actions.forEach((action) => {
        unselect('user', action);
        unselect('computer', action);
    })
}

function message(msg) {
    $gameMessage.text(msg);
}

function reset() {
    unselect('user', userChoice);
    unselect('computer', computerChoice);
    userScore = 0;
    computerScore = 0;
    $userScore.text('0');
    $computerScore.text('0');
}

function tie() {
    computerWin();
    userWin();
}

function whoWin(userChoice, computerChoice, subchoices) {
    if (userChoice === computerChoice) {
        return "tie";
    }
    else {
        return (subchoices.includes(computerChoice) ? "user" : "computer");
    }
}

function play(userChoice, computerChoice) {
    switch (userChoice) {
        case "rock":
            return whoWin("rock", computerChoice, ['lizard', 'scissors']);
        case "paper":
            return whoWin("paper", computerChoice, ['rock', 'spock']);
        case "scissors":
            return whoWin("scissors", computerChoice, ['lizard', 'paper']);
        case "lizard":
            return whoWin("lizard", computerChoice, ['paper', 'spock']);
        case "spock":
            return whoWin("spock", computerChoice, ['rock', 'scissors']);
    }
}

function userPlay() {
    computerChoice = computerChoiceGenerator(actions);
    select('user', userChoice);
    select('computer', computerChoice);
    switch (play(userChoice, computerChoice)) {
        case "user":
            userWin();
            message('You won!');
            startConfetti();
            break;
        case "computer":
            computerWin();
            message('Computer Won :(');
            stopConfetti();
            break;
        case "tie":
            tie();
            stopConfetti();
            message('Tied!');
            break;

    }
}

actions.forEach((action) => {
    $(`#user-${action}`).click(() => {
        clearSelectedChoices();
        userChoice = action;
        userPlay();
    });
})

$('#restart').click(reset);
