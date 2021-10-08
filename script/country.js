//Get country details from session storage and parse
let getCountry;
getCountry = sessionStorage.getItem('country');

function redirect() { //if no country selected - redirect to index
    if (getCountry == null) {
        window.location.href = "index.html";
    }
}
let country = JSON.parse(getCountry);

const title = document.querySelector('title').innerText = country.name + ' Details'

//DOM
const flag = document.getElementById('displayFlag');
const displayName = document.getElementById('displayName');
const displayNativeName = document.getElementById('displayNativeName');
const displayPopulation = document.getElementById('displayPopulation');
const displayRegion = document.getElementById('displayRegion');
const displaySubRegion = document.getElementById('displaySubRegion');
const displayCapital = document.getElementById('displayCapital');
const displayDomain = document.getElementById('displayDomain');
const displayCurrencies = document.getElementById('displayCurrencies');
const displayLanguages = document.getElementById('displayLanguages');
const bordersContainer = document.getElementById('cordersContainer');

//Set results to page
flag.innerHTML = `<img src="${country.flags.png}">`;
displayName.innerHTML = country.name;
displayNativeName.innerHTML = country.nativeName;
displayPopulation.innerHTML = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
displayRegion.innerHTML = country.continent;
displaySubRegion.innerHTML = country.region;
displayCapital.innerHTML = country.capital;
displayDomain.innerHTML = country.topLevelDomain;
displayCurrencies.innerHTML = getCurrencies();
displayLanguages.innerHTML = getLanguages();


//Get currencies array
function getCurrencies() {
    let currencies = [];
    for (let i = 0; i < country.currencies.length; i++) {
        temp = country.currencies[i].name;
        currencies.push(' ' + temp);
        if (i == country.currencies.length - 1) {
            return currencies;
        }
    }
}

//Get languages array
function getLanguages() {
    let languages = [];
    for (let i = 0; i < country.languages.length; i++) {
        temp = country.languages[i].name;
        languages.push(' ' + temp);
        if (i == country.languages.length - 1) {
            return languages;
        }
    }
}

//Get array of borders
function getBorders() {
    let arr = []
    for (let i = 0; i < country.borders.length; i++) {
        arr.push(country.borders[i]);
        if (i == country.borders.length - 1) {
            return arr;
        }
    }
}

//Fetch borders using the array we got ^ and push to DOM
let bordersRetrive = fetch('https://restcountries.com/v2/alpha?codes=' + getBorders())
    .then(response => response.json()).then(
        function retrive(data) {
            for (let i = 0; i < data.length; i++) {
                let border = document.createElement('span');
                border.className = 'border-country';
                if (data[i].name.length > 15){
                    data[i].name = data[i].name.slice(0, (data[i].name.length-15));
                }
                border.innerHTML = data[i].name
                cordersContainer.appendChild(border);
            }
        });
