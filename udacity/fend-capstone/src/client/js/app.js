export let tripInfo = {};

const date = document.querySelector('#user-date');

/* Global Variables */


// Get lat and lon for place from GeoNames API
export const latLongApiCall = async (tripLocation) => {
    console.log('Inside getLatLonApi');
    const geonamesUrl = encodeURI(`${GEONAMES_BASE_URL}${tripLocation}${GEONAMES_MAXROWS_PARAMETERNAME}=10${GEONAMES_USERNAME_PARAMETER_NAME}=${GEONAMES_USERNAME}`);
    console.log(`geonamesUrl: ${geonamesUrl}`);
    const getLatLong = await fetch(geonamesUrl)
        // .then(response => response.text())
        // .then((response) => {
        //     console.log(`getLatLong response: ${response}`);
        //     return response.json();
        // })
        // .then((data) => {
        //     console.log(`getLatLong data: ${data}`);
        // });
        .then((response) => {
            // console.log(`getLatLong response: ${response}`);
            return response.json();

        }).then((responseData) => {
            const tripLocationData = {
                tripLocation: responseData.geonames[0].toponymName,
                lat: responseData.geonames[0].lat,
                lng: responseData.geonames[0].lng,
                countryCode: responseData.geonames[0].countryCode,
                countryName: responseData.geonames[0].countryName
            }

            tripInfo.tripData = tripLocationData;
        }).catch((error) => {
            console.log(error);
        });

    console.log(`tripInfo at the end of latLongApiCall: ${JSON.stringify(tripInfo)}`);
}

export const weatherbitApiCall = async (date) => {   
        
    const dateEntered = new Date(date)
    const currentDate = new Date()
    const daysDifference = getDaysDifference(dateEntered, currentDate);    

    console.log(`Days Difference: ${daysDifference}`);

    const lat = tripInfo.tripData.lat;
    const long = tripInfo.tripData.lng;
    console.log(`long: ${long}`);

    let url = (daysDifference > 7) ? `${WEATHERBIT_FORECAST_API_BASE_URL}${lat}${WEATHERBIT_LONGITUDE_PARAMETER_NAME}=${long}${WEATHERBIT_KEY_PARAMETER_NAME}=${WEATHERBIT_API_KEY}` : `${WEATHERBIT_CURRENT_API_BASE_URL}${lat}${WEATHERBIT_LONGITUDE_PARAMETER_NAME}=${long}${WEATHERBIT_KEY_PARAMETER_NAME}=${WEATHERBIT_API_KEY}`;
    console.log(url);

    const postData = await fetch('http://localhost:50001/tripforecast', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    }).catch((error) => {
        console.log(error);
    });

    const response = postData.json();
    
    response.then((data) => {
        tripInfo.forecastData = data;        
        tripInfo.differenceInDays = daysDifference;        
    }).catch((error) => {
        console.log(`Error in weatherbitApiCall: ${error}`);
    });

}

export const pixabayApiCall = async (city) => {
    console.log('Inside pixabayApiCall');

    city = city.replace(/\s/g, '+');
    
    const countryName = tripInfo.tripData.countryName;
    
    const url_city = `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${city}${PIXABAY_PARAMETERS}`;
    console.log(`url city: ${url_city}`);
    
    const url_country = `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${city},${countryName}${PIXABAY_PARAMETERS}`;

    const getPic = await fetch(url_city);
    
    let data = await getPic.json();    
    let pictureUrl = {};
    if (data.totalHits > 0) {        
        pictureUrl = {
            src: data.hits[0].largeImageURL
        }        
    } else {
        const getPic = await fetch(url_country);        
        let data = await getPic.json();
        pictureUrl = {
            src: data.hits[0].webformatURL
        }
    }

    tripInfo.pic = pictureUrl;    
}


export function updateUI(tripInfo) {

    

}

// Calculation below is based on StackOverflow answer: https://stackoverflow.com/a/15289883
function getDaysDifference(date1, date2) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

    const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utcDate2 - utcDate1) / MILLISECONDS_PER_DAY);
}
/* main function */
export const handleSubmit = async (city) => {

    latLongApiCall(city)
        .then(() => weatherbitApiCall(date))
        .then(() => pixabayApiCall(city))
        .then(() => updateUI(tripInfo));

}



// set up temperature unit and degree symbol
// const DEGREE_CHARACTER = String.fromCharCode(176);
// let temperatureUnit = 'F';
// if (UNITS.toLowerCase().includes('metric')) {
//     temperatureUnit = 'C'
// } else if (UNITS.toLowerCase().includes('kelvin')) {
//     temperatureUnit = 'K'
// }

// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// document.getElementById('generate').addEventListener('click', fetchData);

// function fetchData(e) {
//     const zipCode = document.getElementById('zip').value;
//     getWeather(BASE_URL, zipCode, UNITS, API_KEY)
//         .then(weather => postToJournal(weather))
//         .then(() => updateUI())
//         .catch(error => (console.log(`Error: ${error}`)));
// }

// const getWeather = async (baseURL, zipCode, units, key) => {
//     const response = await fetch(`${baseURL}${zipCode}${units}${key}`);
//     try {
//         const dataReturned = await response.json();
//         return dataReturned;
//     } catch (error) {
//         console.log("error", error);
//     }
// };

// const postToJournal = async (data = {}) => {
//     const url = encodeURI(`${SERVER_URL}/addEntry`);
//     const newEntry = {
//         temp: data.main.temp,
//         date: newDate,
//         feels: document.getElementById('feelings').value,
//     }

//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEntry),
//     });

//     try {
//         const newData = await response.json();
//         return newData;
//     } catch (error) {
//         console.log("error", error);
//     }
// };

// const updateUI = async (weather) => {
//     const zipCode = document.getElementById('zip').value;
//     await getWeather(BASE_URL, zipCode, UNITS, API_KEY).then(weather => {
//         document.querySelector('#date-label').style.visibility = 'visible';
//         document.querySelector('#date').innerHTML = newDate;
//         document.querySelector('#temp-label').style.visibility = 'visible';
//         document.querySelector('#temp').innerHTML = `${weather.main.temp}${DEGREE_CHARACTER} ${temperatureUnit}`;
//         document.querySelector('#content-label').style.visibility = 'visible';
//         document.querySelector('#content').innerHTML = document.getElementById('feelings').value;
//         document.getElementById('zip').value = '';
//         document.getElementById('feelings').value = '';
//     });
// }