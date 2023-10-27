
const bookmarkTemplate = $('#bookmark-template').html();
const container = $('.bookmark-container');
const containerList = $('.bookmark-list-container');
const dialogCloseBtn = $('.dialog-times');
const dialogContainer = $('.dialog-container');
const dialogOverlay = $('.dialog-overlay');
const addBookmarkBtn = $('#bookmark-add-btn');
const dialogForm = $('#dialog-form');

let bookmarks = [
    {
        icon: "https://ssl.gstatic.com/translate/favicon.ico",
        url: "https://translate.google.com",
        name: "Google Translate"
    },
];

function closeDialog() {
    dialogContainer.hide();
    dialogOverlay.hide();
}

function openDialog() {
    dialogContainer.show();
    dialogOverlay.show();
}


// Function to extract the favicon URL from the HTML
function extractFaviconURL(html) {
    const match = /<link .*?rel="icon" .*?href="([^"]+)"/i.exec(html);
    return match ? match[1] : null;
}

async function extractBookmarkIcon(websiteURL) {
    try {
        const response = await fetch(websiteURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        const faviconURL = extractFaviconURL(html);

        if (faviconURL) {
            return faviconURL; // Return the favicon URL
        }
    } catch (error) {
        console.error('Error fetching website:', error);
    }
    return null; // Return null if there was an error or no favicon found
}

function updateLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function generateBookmarkComponent({ name, link, icon }) {
    const $bookmark = $(bookmarkTemplate);
    $bookmark.find('.bookmark-icon').attr('src', icon);
    $bookmark.find('.bookmark-item-link').attr('href', link).text(name);
    return $bookmark;
}

function addBookmark(bookmark) {
    bookmarks.push(bookmark)
    const $bookmark = generateBookmarkComponent(bookmark);
    containerList.append($bookmark);
    updateLocalStorage();
}

const isURL = (url) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return url.match(regex)
}

function bookmarkSaveFormHandler(e) {
    e.preventDefault();
    let bookmark = {
        name: e.target[0].value,
        link: e.target[1].value,
    }
    if (!bookmark.link || !bookmark.name) {
        alert('All informations about bookmark must be provided.');
    }

    if (isURL(bookmark.link)) {
        if (!bookmark.link.includes('https://', 'http://')) {
            bookmark.link = `https://${bookmark.link}`;
        }
        addBookmark(bookmark);
    } else {
        alert("Invalid url provided");
    }
    bookmark.icon = extractBookmarkIcon(bookmark.link);

    console.log(bookmark.name, bookmark.link, bookmark.icon)
}


dialogCloseBtn.click(function() {
    closeDialog();
});

addBookmarkBtn.click(function() {
    openDialog();
});
containerList.on('click', '.remove-bookmark', function() {
    $(this).closest('.bookmark-item').remove();
});


// restoreLocalBookmarks();

dialogForm.submit(bookmarkSaveFormHandler);

// TODO: Retrieve favicon
