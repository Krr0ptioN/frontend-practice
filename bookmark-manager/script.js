
const dialogCloseBtn = $('.dialog-times');
const dialogContainer = $('.dialog-container');
const dialogOverlay = $('.dialog-overlay');
const addBookmarkBtn = $('#bookmark-add-btn');

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
