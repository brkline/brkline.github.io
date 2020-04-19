import { handleSubmit } from "./js/app.js"

// Add an event listener for the submit button
document.querySelector('.submit-btn').addEventListener('click', () => {

    event.preventDefault();

    const date = document.querySelector('#departure-date').value;
    const city = document.querySelector('#destination').value;

    const todayDate = new Date().toJSON().slice(0, 10);

    if (city == '' || date == '') {

        alert('Please enter a valid city and date.');

    } else if (date < todayDate) {

        alert('Departure Date cannot be before today.');

    } else {

        handleSubmit(city, date);

    }
});


document.querySelector('.reset-btn').addEventListener('click', () => {

    document.querySelector('.result-container').style.display = 'none';

});


//import styles files
import './styles/base.scss'
import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/results.scss'
import './styles/media-screen.scss'


export { handleSubmit }