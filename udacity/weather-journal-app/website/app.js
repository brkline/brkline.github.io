/* Global Variables */
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const API_KEY = '&APPID=0c10360aec2b8a1a6c5c1e9ce3590ee7';
const UNITS = '&units=imperial';
const feelings = document.getElementById('feelings');
const SERVER_URL = 'http://localhost:50001';

// set up temperature unit and degree symbol
const DEGREE_CHARACTER = String.fromCharCode(176);
let temperatureUnit = 'F';
if (UNITS.toLowerCase().includes('metric')) {
    temperatureUnit = 'C'
} else if (UNITS.toLowerCase().includes('kelvin')) {
    temperatureUnit = 'K'
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', fetchData);

function fetchData(e) {    
    const zipCode = document.getElementById('zip').value;
    getWeather(BASE_URL, zipCode, UNITS, API_KEY)
        .then(weather => postToJournal(weather))
        .then(() => updateUI())
        .catch(error => (console.log(`Error: ${error}`)));
}

const getWeather = async (baseURL, zipCode, units, key) => {
    const response = await fetch(`${baseURL}${zipCode}${units}${key}`);
    try {
        const dataReturned = await response.json();        
        return dataReturned;
    } catch (error) {
        console.log("error", error);
    }
};

const postToJournal = async (data = {}) => {
    const url = encodeURI(`${SERVER_URL}/addEntry`);
    const newEntry = {
        temp: data.main.temp,
        date: newDate,
        feels: document.getElementById('feelings').value,
    }

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async (weather) => {
    const zipCode = document.getElementById('zip').value;
    await getWeather(BASE_URL, zipCode, UNITS, API_KEY).then(weather => {
        document.querySelector('#date-label').style.visibility = 'visible';
        document.querySelector('#date').innerHTML = newDate;
        document.querySelector('#temp-label').style.visibility = 'visible';
        document.querySelector('#temp').innerHTML = `${weather.main.temp}${DEGREE_CHARACTER} ${temperatureUnit}`;
        document.querySelector('#content-label').style.visibility = 'visible';
        document.querySelector('#content').innerHTML = document.getElementById('feelings').value;
        document.getElementById('zip').value = '';
        document.getElementById('feelings').value = '';
    });
}