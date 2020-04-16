function handleSubmit(event) {
    event.preventDefault()
    const SERVER_URL = 'http://localhost:8080';

    // check what text was put into the form field
    console.log('Inside handleSubmit function');
    let newsUrl = document.getElementById('news-url').value
    // checkForName(formText)
    if (checkForValidURL(newsUrl)) {
        postToForm(encodeURI(SERVER_URL), {
            formText: newsUrl
        }).then(function (projectData) {
            // update UI
            document.getElementById('polarity').innerHTML = projectData.polarity
            document.getElementById('subjectivity').innerHTML = projectData.polarity
            document.getElementById('text').innerHTML = Client.cutString(
                projectData.text,
                500
            )
            document.getElementById('polarity_confidence').innerHTML =
                projectData.polarity_confidence
            document.getElementById('subjectivity_confidence').innerHTML =
                projectData.subjectivity_confidence

            // empty error message
            document.getElementById('errorMessage').innerHTML = ''
        })
    } else {
        // error message
        // document.getElementById('errorMessage').innerHTML =
        //     'Invalid URL.  Please try again.'
        alert('Invalid URL')
    }

    console.log('::: Form Submitted :::')

    const postToForm = async (url = '', projectData = {}) => {

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });

        try {
            const newData = await response.json();
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    };
}

export {handleSubmit}