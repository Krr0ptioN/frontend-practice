const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.querySelector('nav');
const figure1 = document.getElementById('figure-web-innovation');
const figure2 = document.getElementById('figure-problem-solving');
const figure3 = document.getElementById('figure-high-concept');
const toggleIcon = document.getElementById('theme-icon');
const themeTitle = document.getElementById('theme-title');

function toggleImagesTheme(color) {
    figure1.src = `img/undraw_conceptual_idea_${color}.svg`;
    figure2.src = `img/undraw_feeling_proud_${color}.svg`;
    figure3.src = `img/undraw_proud_coder_${color}.svg`;
}

function darkModeToggle(isLight) {
    document.documentElement.setAttribute('data-theme',
        (isLight ? 'dark' : 'light')
    );
    localStorage.setItem('theme', (isLight ? 'dark' : 'light'));
    toggleImagesTheme(isLight ? 'dark' : 'light');
    nav.style.backgroundColor = isLight ? 'rgba(0 0 0 / 50%)' : 'rgba(255 255 255 / 50%)';
    toggleIcon.classList.replace(isLight ? 'fa-sun' : 'fa-moon', isLight ? 'fa-moon' : 'fa-sun');
    themeTitle.textContent = isLight ? 'Dark Mode' : 'Light Mode';
}

function switchTheme(event) {
    darkModeToggle(event.target.checked);
}

if (localStorage.getItem('theme') === 'dark') {
    toggleSwitch.checked = true;
} else {
    toggleSwitch.checked = false;
}

darkModeToggle(toggleSwitch.checked);
toggleSwitch.addEventListener('change', switchTheme);
