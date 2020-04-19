import { constants } from './api-constants'
export let tripInfo = {};

const date = document.querySelector('#user-date');

// Get lat and lon for place from GeoNames API
export const latLongApiCall = async (tripLocation) => {
    const geonamesUrl = encodeURI(`${constants.GEONAMES_BASE_URL}${tripLocation}${constants.GEONAMES_MAXROWS_PARAMETERNAME}=10${constants.GEONAMES_USERNAME_PARAMETER_NAME}=${constants.GEONAMES_USERNAME}`);
    const getLatLong = await fetch(geonamesUrl)
        .then((response) => {
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
            console.log(`Error in latLongApiCall: ${error}`);
            alert('We ran into an unexpected issue and a notification was sent to an Engineer. Please try your request again.');
        });
}

export const weatherbitApiCall = async (date) => {

    // Calculation below is based on StackOverflow answer: https://stackoverflow.com/a/15289883
    let daysDifference = ((date1) => {
        const dt1 = new Date(date1);
        const dt2 = new Date();
        return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())) / (1000 * 60 * 60 * 24));
    })(date);

    const lat = tripInfo.tripData.lat;
    const long = tripInfo.tripData.lng;

    let url = '';
    if (daysDifference > 7) {
        url = `${constants.WEATHERBIT_FORECAST_API_BASE_URL}${lat.trim()}${constants.WEATHERBIT_LONGITUDE_PARAMETER_NAME}=${long.trim()}${constants.WEATHERBIT_UNITS_PARAMETER_NAME}=${constants.WEATHERBIT_UNITS}${constants.WEATHERBIT_KEY_PARAMETER_NAME}=${constants.WEATHERBIT_API_KEY}`;
    } else {
        url = `${constants.WEATHERBIT_CURRENT_API_BASE_URL}${lat.trim()}${constants.WEATHERBIT_LONGITUDE_PARAMETER_NAME}=${long.trim()}${constants.WEATHERBIT_UNITS_PARAMETER_NAME}=${constants.WEATHERBIT_UNITS}${constants.WEATHERBIT_KEY_PARAMETER_NAME}=${constants.WEATHERBIT_API_KEY}`;
    }


    const postData = await fetch(encodeURI(constants.TRIP_FORECAST_HOST_URL), {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    }).catch((error) => {
        console.log(`Error in postData: ${error}`);
    });

    const response = postData.json();

    response.then((data) => {
        tripInfo.forecastData = data;
        tripInfo.differenceInDays = daysDifference;
    }).catch((error) => {
        console.log(`Error in weatherbitApiCall: ${error}`);
        alert('We had an issue retrieving your forecast and a notification was sent to an Engineer. Please try your request again.');
    });

}

export const pixabayApiCall = async (city) => {

    const countryName = tripInfo.tripData.countryName;

    const url_city = `${constants.PIXABAY_BASE_URL}?key=${constants.PIXABAY_API_KEY}&q=${city.trim()}${constants.PIXABAY_PARAMETERS}`;

    const url_country = `${constants.PIXABAY_BASE_URL}?key=${constants.PIXABAY_API_KEY}&q=${city.trim()},${constants.countryName}${constants.PIXABAY_PARAMETERS}`;

    const getPic = await fetch(encodeURI(url_city.trim()));

    let data = await getPic.json();
    let pictureUrl = {};
    if (data.totalHits > 0) {
        pictureUrl = {
            src: data.hits[0].largeImageURL
        }
    } else {
        const getPic = await fetch(encodeURI(url_country.trim()));
        let data = await getPic.json();
        pictureUrl = {
            src: data.hits[0].webformatURL
        }
    }

    tripInfo.pic = pictureUrl;
}


export function updateUI(tripInfo) {

    const daysUntilTrip = tripInfo.differenceInDays;
    const dayOrDays = (daysUntilTrip === 1) ? 'day' : 'days';
    const imgUrl = tripInfo.pic.src;

    const dailyHighTemp = Math.round(tripInfo.forecastData.forecastHighTemp);
    const DailyLowTemp = Math.round(tripInfo.forecastData.forecastLowTemp);
    const currentTemp = Math.round(tripInfo.forecastData.currentTemp);
    const dailyIcon = tripInfo.forecastData.forecastIcon;
    const currentIcon = tripInfo.forecastData.currentIcon;
    const tripLocation = tripInfo.tripData.tripLocation;

    document.querySelector('.result-container').style.display = 'flex';

    document.querySelector('.country').innerHTML = `${tripLocation} trip`;

    const end_date = document.querySelector('#return-date').value;
    const start_date = document.querySelector('#departure-date').value;
    const tripLength = ((date1, date2) => {
        const dt1 = new Date(date1);
        const dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    })(start_date, end_date);

    document.querySelector('.length').innerHTML = tripLength;
    if (tripLength > 1) {
        document.querySelector('.ldays').innerHTML = ' days.';
    } else {
        document.querySelector('.ldays').innerHTML = ' day.';
    }

    document.querySelector('.days').innerHTML = daysUntilTrip + ' ' + dayOrDays + ' ';

    document.querySelector('.img').src = imgUrl;

    if (daysUntilTrip < 7) {

        document.querySelector('.temps').innerHTML = 'Current Temperature is: ' + currentTemp + '&#8457;';

        document.querySelector('.daily-forecast-icon').src = '/weather-icons/' + dailyIcon + '.png';
        document.querySelector('.current-weather-icon').style.display = 'none';

    } else {

        document.querySelector('.temps').innerHTML = 'High- ' + dailyHighTemp + '&#8457;, Low- ' + DailyLowTemp + '&#8457;';
        document.querySelector('.current-weather-icon').src = '/weather-icons/' + currentIcon + '.png';
        document.querySelector('.daily-forecast-icon').style.display = 'none';

    }


}

/* main function */
export const handleSubmit = async (city, date) => {

    latLongApiCall(city)
        .then(() => weatherbitApiCall(date))
        .then(() => pixabayApiCall(city))
        .then(() => updateUI(tripInfo));

}