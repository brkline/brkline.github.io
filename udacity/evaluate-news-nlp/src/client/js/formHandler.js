import { isValidUrl } from './urlValidation'
function handleSubmit(event) {
    event.preventDefault()
    
    const baseURL = "http://localhost:50001/sentiment";
    const url = document.getElementById('url').value;

    if (isValidUrl(url)) {
        fetch(baseURL, {
            method: 'POST',
            credentials: 'same-origin',            
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url})
        })
            .then(res => res.json())
            .then(function (res) {
                document.getElementById('polarity').innerHTML = res.polarity
                document.getElementById('subjectivity').innerHTML = res.subjectivity
                document.getElementById('polarity-confidence').innerHTML = res.polarityConfidence
                document.getElementById('subjectivity-confidence').innerHTML = res.subjectivityConfidence
            });
        console.log('::: Form Submitted :::')        

    } else {
        alert("The URL is not valid.")
    }
}

export {handleSubmit}