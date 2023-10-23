
let quotes = [];
const apiURL = 'https://type.fit/api/quotes';
const twitterApiURL = 'https://twitter.com/intent/tweet';

async function fetchQuotes() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        quotes = data;
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
}
function randomQuoteId() {
    const min = 0;
    const max = quotes.length - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomQuote() {
    if (quotes.length == 0) {
        await fetchQuotes();
    }

    let quote = quotes[randomQuoteId()];
    if (quote.text.length > 15) {
        $('quote').addClass('long-quote');
    } else {
        $('quote').removeClass('long-quote');
    }
    $('#quote').text(quote.text);
    $('#author').text(quote.author.split(',')[0]);

}

getRandomQuote();
$('.new-quote-button').click(function() {
    getRandomQuote();
});

$('.twitter-button').click(function() {
    const text = $('#quote').text();
    const author = $('#author').text();
    const twitterURL = `${twitterApiURL}?text=${text} - ${author}`
    window.open(twitterURL, '_blank');
});
