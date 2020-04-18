// import { fetchData } from './js/app'

// import './styles/style.scss' 

// export{fetchData}

import { handleSubmit } from "./js/app.js"

//main event Handler
//add event-listener for submit button
document.querySelector('.save-btn').addEventListener('click', () => {
    
    event.preventDefault();

    const date = document.querySelector('#start-date').value;
    const city = document.querySelector('#user-location').value;
    
    

    
    const todayDate = new Date().toJSON().slice(0, 10);

    if(city == '' || date == '') {
       
        alert('please enter a valid city and date!');
    
    }else if(date < todayDate) {

        alert('Travel Date can not be before current time');

    }else {

        handleSubmit(city);

    }
});


document.querySelector('.remove-btn').addEventListener('click', ()=> {

document.querySelector('.Res-container').style.display = 'none';

});


//import styles files
import './styles/base.scss'
import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/results.scss'
import './styles/media-screen.scss'


export { handleSubmit }