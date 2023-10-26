
const menuBars = $('.menu-bar-container');
const overlay = $('#overlay')

let navItems = [];
for (let index = 1; index < 6; index++) {
    navItems.push($(`#nav-${index}`));
}

function navAnimation(navItems, from, to) {
    navItems.forEach((nav, i) => {
        nav.removeClass(`slide-${from}-${i + 1}`)
            .addClass(`slide-${to}-${i + 1}`)
    });
}

function toggleNav() {
    menuBars.toggleClass('change');
    overlay.toggleClass('overlay-active');
    if (overlay.hasClass('overlay-active')) {
        overlay.addClass('overlay-slide-right').removeClass('overlay-slide-left');

        navAnimation(navItems, 'out', 'in');
    } else {
        overlay.addClass('overlay-slide-left').removeClass('overlay-slide-right');
        navAnimation(navItems, 'in', 'out');
    }
}


menuBars.click(function() { toggleNav() });
navItems.forEach((nav) => { nav.click(function() { toggleNav() }) });
