var path = require('path')
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
var aylien = require("aylien_textapi");

const dotenv = require('dotenv');
dotenv.config();

let projectData = {};

// set aylien API credentials
console.log(`API key: ${process.env.API_KEY}`);
console.log(`API ID: ${process.env.APP_ID}`);
var alyienApi = new aylien({
    application_id: process.env.APP_ID,
    application_key: process.env.API_KEY
    });

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/sentiment', function (req, res) {
    const urlNews = req.body.url;
    alyienApi.sentiment({url: urlNews}, function(error, response) {
        if (error === null) {           
            projectData = {
              polarity: response.polarity,
              subjectivity: response.subjectivity,
              polarityConfidence: response.polarity_confidence,
              subjectivityConfidence: response.subjectivity_confidence
            }            
            
            console.log(projectData)
            res.send(projectData);
        } else {
            console.log(error)
        }
    });
})

// Setup Server
const port = 50001;
const server = app.listen(port, listening => {
    console.log(`running on localhost: ${port}`);
});

