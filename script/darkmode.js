//DOM
const darkMode = document.getElementById('darkMode');
const root = document.querySelector(':root');
const filterDropDown = document.getElementById('filterDD')

if (localStorage.getItem('theme') === 'dark') {
    toggleDarkModeOn()
} else if (localStorage.getItem('theme') === 'light') {
    toggleDarkModeOff()
} else if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'light');
}

darkMode.addEventListener('click', function(e){
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light')
        toggleDarkModeOff()
    } else if (localStorage.getItem('theme') === 'light') {
        localStorage.setItem('theme', 'dark')
        toggleDarkModeOn()
    } else if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'dark');
    } else {
        return
    }
});

function toggleDarkModeOn() {
    root.style.setProperty('--background', 'hsl(207, 26%, 17%)');
    root.style.setProperty('--whiteBackgrounds', 'hsl(209, 23%, 22%)');
    root.style.setProperty('--fontColor', 'white');
    root.style.setProperty('--boxShadow', '0 0 3px 1px rgb(40, 40, 40)');
    root.style.setProperty('--headerBoxShadow', '0 0 10px 1px rgb(40, 40, 40)');
    root.style.setProperty('--dm-bg', 'hsl(209, 13%, 45%)');
    filterDropDown.style.background = 'hsl(209, 23%, 22%)';
}

function toggleDarkModeOff() {
    root.style.setProperty('--background', 'hsl(0, 0%, 98%)');
    root.style.setProperty('--whiteBackgrounds', '(#fff)');
    root.style.setProperty('--fontColor', 'hsl(200, 15%, 8%)');
    root.style.setProperty('--boxShadow', '1px 1px 3px 0 rgb(216, 216, 216)');
    root.style.setProperty('--headerBoxShadow', '0 0 5px 0 rgb(165, 165, 165)');
    root.style.setProperty('--dm-bg', 'hsl(0, 0%, 90%');
    filterDropDown.style.background = 'white';
}