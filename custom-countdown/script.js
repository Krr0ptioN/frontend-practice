
const datePicker = $('#date-picker');
const inputContainer = $('.input-container');
const countDownForm = $('#countdownForm');
const countDownContainer = $('#countdown');
const completeContainer = $('#complete');
const completeInfo = $('#complete-info');
const completeBtn = $('#complete-button');
const resetCountdownButton = $('#countdown-button');
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const today = new Date().toISOString().split('T')[0];
datePicker.attr('min', today);
let countdownActive;

function moveInput() {
    completeContainer.hide();
    countDownContainer.hide();
    inputContainer.show();
}
function moveCountdown() {
    inputContainer.hide();
    completeContainer.hide();
    countDownContainer.show();
}
function moveComplete() {
    inputContainer.hide();
    countDownContainer.hide();
    completeContainer.show();
}


function reset() {
    moveInput();
    clearInterval(countdownActive);
    countdown.date = "";
    countdown.title = "";
}

resetCountdownButton.click(reset);
completeBtn.click(reset);

function completion() {
    completeInfo.text(`${countdown.title} Finished on ${countdown.date}`);
    moveComplete();
}

function updateCountdownDateDOM({ days, hours, minutes, seconds }) {
    $('#date-days').text(days);
    $('#date-hours').text(hours);
    $('#date-minutes').text(minutes);
    $('#date-seconds').text(seconds);
}

function updateCountdownTitle(title) {
    $('.countdown-title').text(title);
}

function calculateTime(distance) {
    const days = Math.floor((distance / DAY));
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);
    return { days, hours, minutes, seconds };
}

function updateCountdown(countdownValue) {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        if (distance < 0) {
            completion();
        }
        updateCountdownDateDOM(calculateTime(distance));
    }, SECOND);
}


let countdown = {
    title: "",
    date: "",
}



function countdownHandler(e) {
    e.preventDefault();
    countdown.title = e.target[0].value;
    countdown.date = e.target[1].value;
    if (countdown.date === "") {
        alert('Please make sure you provide correct date');
    } else {
        countdownValue = new Date(countdown.date).getTime();
        moveCountdown();
        updateCountdownTitle(countdown.title);
        updateCountdown(countdownValue);

    }
}

countDownForm.submit(countdownHandler);
