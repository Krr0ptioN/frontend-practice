
const menuBars = $('.menu-bar-container');
const overlay = $('#overlay')

const navItemHome = $('#nav-1');
const navItemAbout = $('#nav-2');
const navItemSkills = $('#nav-3');
const navItemProjects = $('#nav-4');
const navItemContact = $('#nav-5');

function toggleNav() {
    menuBars.toggleClass('change');
    overlay.toggleClass('overlay-active');
    if (overlay.hasClass('overlay-active')) {
        overlay.addClass('overlay-slide-right');
        overlay.removeClass('overlay-slide-left');
    } else {
        overlay.addClass('overlay-slide-left');
        overlay.removeClass('overlay-slide-right');
    }
}


menuBars.click(function() { toggleNav() });

navItemHome.click(function() { toggleNav() });
navItemAbout.click(function() { toggleNav() });
navItemSkills.click(function() { toggleNav() });
navItemProjects.click(function() { toggleNav() });
navItemContact.click(function() { toggleNav() });
