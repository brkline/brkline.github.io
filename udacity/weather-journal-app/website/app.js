/* Global Variables */
let BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let API_KEY = '&APPID=<sign up and get your own at https://home.openweathermap.org/users/sign_up>';
let UNITS = '&units=imperial';
const feelings = document.getElementById('feelings');
const SERVER_URL = 'http://localhost:50001';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', fetchData);

function fetchData(e) {
    console.log('clicked');
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
        console.log(dataReturned);
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
        document.querySelector('#date').innerHTML = newDate;        
        document.querySelector('#temp').innerHTML = weather.main.temp;        
        document.querySelector('#content').innerHTML = document.getElementById('feelings').value;        
    });    
}