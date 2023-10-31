

const actions = [
    "rock", "paper", "scissors", "lizard", "spock"
]


const $userScore = $('#user-score');
const $computerScore = $('#computer-score');
const $gameMessage = $('#game-msg');

function getRandomElementFromArray(arr) {
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
    const $userChoice = $(`div#${user}-${action}>i`);
    $userChoice.toggleClass('selected');
}

let userChoice = "";
let computerChoice = "";


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

function celebrate() {

}

function userPlay() {
    computerChoice = getRandomElementFromArray(actions);
    select('user', userChoice);
    select('computer', computerChoice);
    switch (play(userChoice, computerChoice)) {
        case "user":
            userWin();
            message('You won!');
            celebrate();
            break;
        case "computer":
            computerWin();
            message('Computer Won :(');
            break;
        case "tie":
            tie();
            message('Tied!');
            break;

    }
}

actions.forEach((action) => {
    $(`div#user-${action}`).click(() => {
        userChoice = action;
        userPlay();
    });
})

$('#restart').click(reset);
