
const datePicker = $('#date-picker');
const inputContainer = $('.input-container');
const countDownForm = $('#countdownForm');
const countDownContainer = $('#countdown');
const completeContainer = $('#complete');
const resetCountdownButton = $('#countdown-button');
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

let countdownActive;

class Steps {
    constructor() {
        this.steps = [inputContainer, countDownContainer, completeContainer];
        this.currentStep = 0;
    }

    next() {
        this.steps[this.currentStep].hide();
        this.currentStep++;
        this.steps[this.currentStep].show();
    }

    prev() {
        this.steps[this.currentStep].hide();
        this.currentStep--;
        this.steps[this.currentStep].show();
    }
}

const steps = new Steps();

resetCountdownButton.click(function() {
    steps.prev();
    clearInterval(countdownActive);
    countdown.date = "";
    countdown.title = "";
})

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
        updateCountdownDateDOM(calculateTime(distance));
    }, SECOND);
}


let countdown = {
    title: "",
    date: "",
}

const today = new Date().toISOString().split('T')[0];
datePicker.attr('min', today);

function countdownHandler(e) {
    e.preventDefault();
    countdown.title = e.target[0].value;
    countdown.date = e.target[1].value;
    if (countdown.date === "") {
        alert('Please make sure you provide correct date');
    } else {
        countdownValue = new Date(countdown.date).getTime();
        steps.next();
        updateCountdownTitle(countdown.title);
        updateCountdown(countdownValue);

    }
}

countDownForm.submit(countdownHandler);
