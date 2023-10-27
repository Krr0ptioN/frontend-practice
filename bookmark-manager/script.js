
const bookmarkTemplate = $('#bookmark-template').html();
const container = $('.bookmark-container');
const containerList = $('.bookmark-list-container');
const dialogCloseBtn = $('.dialog-times');
const dialogContainer = $('.dialog-container');
const dialogOverlay = $('.dialog-overlay');
const addBookmarkBtn = $('#bookmark-add-btn');
const dialogForm = $('#dialog-form');

let bookmarks = [];

function closeDialog() {
    dialogContainer.hide();
    dialogOverlay.hide();
}

function openDialog() {
    dialogContainer.show();
    dialogOverlay.show();
}


// Function to extract the favicon URL from the HTML
function faviconURL(url) {
    return `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
}

function updateLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function generateBookmarkComponent({ name, link, icon }) {
    const $bookmark = $(bookmarkTemplate);
    $bookmark.find('.bookmark-icon').attr('src', icon).attr('alt', 'Favicon');
    $bookmark.find('.bookmark-item-link').attr('href', link).attr('target', '_blank').text(name);
    return $bookmark;
}


function addBookmark(bookmark) {
    bookmarks.push(bookmark)
    const $bookmark = generateBookmarkComponent(bookmark);
    containerList.append($bookmark);
    updateLocalStorage();
}

function restoreLocalBookmarks() {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    populateBookmarks();
}


function populateBookmarks() {
    bookmarks.forEach(bookmark => {
        const $bookmark = generateBookmarkComponent(bookmark);
        containerList.append($bookmark);
    });
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
    bookmark.icon = faviconURL(bookmark.link);

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


dialogForm.submit(bookmarkSaveFormHandler);

restoreLocalBookmarks();
