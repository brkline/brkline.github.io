// Used for storing sensitive data like API keys
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// const path = require('path');
const fetch = require('node-fetch');

// Initialize the main project folder
app.use(express.static('dist'));

// GET Route
app.get('/', (request, response) => {
    response.sendFile('dist/index.html');
})

// POST Route
app.post('/tripforecast', async (request, response) => {
    console.log('Inside POST /tripforecast');
    // Request forecast from Weatherbit api
    const getWeatherbitForecast = await fetch(request.body.url);

    console.log(`POST Route Body Url: ${request.body.url}`);
    const forecastResponse = getWeatherbitForecast.json();
    // .then( (response) => {
    //      return response.json();
    // })
    forecastResponse.then((weatherbitForecast) => {

        const weatherbitResponse = {
            currentTemp: weatherbitForecast.data[0].temp,
            currentIcon: weatherbitForecast.data[0].weather.icon,
            forecastHighTemp: weatherbitForecast.data[0].max_temp,
            forecastLowTemp: weatherbitForecast.data[0].low_temp,
            forecastIcon: weatherbitForecast.data[0].weather.icon

        }

        response.send(weatherbitResponse);

    }).catch((error) => {
        console.log(error);
    });
});

// Trip Data GET route
app.get('/tripdata', (request, response) => {
    response.send(tripInfo);
    console.log(tripInfo);
});

// Setup Server
const port = 50001;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
}

module.exports = app;