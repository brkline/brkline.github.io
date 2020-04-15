const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi");
// set aylien API credentials
var alyienapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express()
app.use(cors())
// Body Parser JSON
app.use(bodyParser.json())
// Body Parser URL Encoding
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
  // res.sendFile(path.resolve('src/client/views/index.html'))
})

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

app.post('/addEntry', addEntry);

function addEntry(request, response) {
  let requestData = request.body
  alyienapi.sentiment({
      url: requestData.formText
    },
    function (error, response) {
      if (error === null) {
        response.send(response)
      } else {
        console.error(error)
      }
    }
  )
}

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})