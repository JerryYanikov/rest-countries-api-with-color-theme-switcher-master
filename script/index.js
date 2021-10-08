//DOM
const filterArrow = document.getElementById('filterArrow');
const filterBox = document.getElementById('filterBox');
const filterDD = document.getElementById('filterDD');
const filterSelection = document.querySelectorAll('.filter-selection');
const filterText = document.getElementById('filterText');
const countries = document.getElementById('countries');
const countryName = document.getElementById('countryName');
const countryPopulation = document.getElementById('poplation');
const countryRgion = document.getElementById('region');
const countryCapital = document.getElementById('capital');
const searchBox = document.getElementById('searchBox');
const searchIcon = document.getElementById('searchIcon');



//Filter by continent selector
filterDD.style.display = 'none'; //default = hide selection list
filterBox.addEventListener('click', function (e) { // display/hide slection list by clicking on the filter box
    let showDD = filterDD.style.display
    if (showDD == 'none') {
        showDD = 'block';
        filterDD.style.display = showDD;
    } else if (showDD == 'block') {
        showDD = 'none';
        filterDD.style.display = showDD;
    }
});

document.addEventListener('click', function (e) { //hide selection list if click anywhere but the filter box
    if (e.target != filterBox && e.target != filterText && e.target != filterArrow) {
        if (filterDD.style.display = 'block') {
            filterDD.style.display = 'none';
        }
    }
});

for (let i = 0; i < filterSelection.length; i++) { //change the displayed text on the filter box to the selected input
    filterSelection[i].addEventListener('click', function (e) {
        filterText.innerText = filterSelection[i].innerText;
        resultsByContinent(i);
    })
}

//On load show all
fetch('https://restcountries.com/v2/all')
    .then(response => response.json()).then(
        function retrive(data) {
            for (let i = 0; i < data.length; i++) {
                let countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                countryCard.innerHTML = `<img class="country-flag" id="countryFlag" src=${data[i].flags[1]}></img><div class="country-details"><h2 id="countryName">${data[i].name}</h2><div class="country-data-line"><div class="country-data-description">Population:</div><div id="poplation">${(data[i].population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div></div><div class="country-data-line"><div class="country-data-description">Region:</div><div id="region">${data[i].region}</div></div><div class="country-data-line"><div class="country-data-description">Capital:</div><div id="capital">${data[i].capital}</div></div></div>`;
                countries.appendChild(countryCard);
                countryCard.addEventListener('click', function (e) {
                    sessionStorage.setItem('country', JSON.stringify(data[i])); //Save country details to session storage and stringify
                    location.href = 'country.html';
                });
            };
        });


//When typing in searchbox show only results
searchBox.addEventListener('input', searched);

function searched() {
    countries.innerHTML = '';
    fetch('https://restcountries.com/v2/name/' + searchBox.value)
        .then(response => response.json()).then(
            function retrive(data) {
                for (let i = 0; i < data.length; i++) {
                    let countryCard = document.createElement('div');
                    countryCard.className = 'country-card';
                    countryCard.innerHTML = `<img class="country-flag" id="countryFlag" src=${data[i].flags[1]}></img><div class="country-details"><h2 id="countryName">${data[i].name}</h2><div class="country-data-line"><div class="country-data-description">Population:</div><div id="poplation">${(data[i].population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div></div><div class="country-data-line"><div class="country-data-description">Region:</div><div id="region">${data[i].region}</div></div><div class="country-data-line"><div class="country-data-description">Capital:</div><div id="capital">${data[i].capital}</div></div></div>`;
                    countries.appendChild(countryCard);
                    countryCard.addEventListener('click', function (e) {
                        sessionStorage.setItem('country', JSON.stringify(data[i])); //Save country details to session storage and stringify
                        location.href = 'country.html';
                    });
                };
            });
}

//when filter by continent show only results
function resultsByContinent(i) {
    countries.innerHTML = '';
    if (searchBox.value != '') { //empty search box
        searchBox.value = '';
    }
    fetch('https://restcountries.com/v2/continent/' + filterSelection[i].innerText)
        .then(response => response.json()).then(
            function retrive(data) {
                for (let i = 0; i < data.length; i++) {
                    let countryCard = document.createElement('div');
                    countryCard.className = 'country-card';
                    countryCard.innerHTML = `<img class="country-flag" id="countryFlag" src=${data[i].flags[1]}></img><div class="country-details"><h2 id="countryName">${data[i].name}</h2><div class="country-data-line"><div class="country-data-description">Population:</div><div id="poplation">${(data[i].population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div></div><div class="country-data-line"><div class="country-data-description">Region:</div><div id="region">${data[i].region}</div></div><div class="country-data-line"><div class="country-data-description">Capital:</div><div id="capital">${data[i].capital}</div></div></div>`;
                    countries.appendChild(countryCard);
                    countryCard.addEventListener('click', function (e) {
                        sessionStorage.setItem('country', JSON.stringify(data[i])); //Save country details to session storage and stringify
                        location.href = 'country.html';
                    });
                };
            });

}
