
const bookmarkTemplate = $('#bookmark-template').html();
const container = $('.bookmark-container');
const dialogCloseBtn = $('.dialog-times');
const dialogContainer = $('.dialog-container');
const dialogOverlay = $('.dialog-overlay');
const addBookmarkBtn = $('#bookmark-add-btn');

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


dialogCloseBtn.click(function() {
    closeDialog();
});

addBookmarkBtn.click(function() {
    openDialog();
});


bookmarks.forEach(function(bookmark) {
    const $bookmark = $(bookmarkTemplate);
    $bookmark.find('.bookmark-icon').attr('src', bookmark.icon);
    $bookmark.find('.bookmark-item-link').attr('href', bookmark.url).text(bookmark.name);

    container.append($bookmark);
});

// Add event listener to remove bookmarks
container.on('click', '.remove-bookmark', function() {
    $(this).closest('.bookmark-item').remove();
});



// TODO: Retrieve favicon
