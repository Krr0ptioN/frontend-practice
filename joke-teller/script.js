
const VOICE_RSS_API = "ca95a78c08f04d478957a40b7b96d7b5";
const JOKE_URL = 'https://v2.jokeapi.dev/joke/Any';

async function joke() {
    try {
        const res = await fetch(JOKE_URL);
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    } catch (e) {
        console.error(e);
    }
}

function formatJoke(res) {
    switch (res.type) {
        case 'twopart':
            return res.setup + " - " + res.delivery;
        case 'single':
            return res.joke;
        default:
            return 'Failed to format joke';
    }
}

function speak(speech) {
    VoiceRSS.speech({
        key: VOICE_RSS_API,
        src: speech,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

let aud = document.getElementById("joke-btn");
aud.addEventListener("click", function() {
    joke()
        .then((response) => {
            const formattedJoke = formatJoke(response);
            speak(formattedJoke);
        })
        .catch((error) => {
            console.error(error);
        });
});
