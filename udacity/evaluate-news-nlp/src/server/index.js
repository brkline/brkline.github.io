const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
var aylien = require("aylien_textapi");
// set aylien API credentials
var alyienapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express()
app.use(cors())
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (request, response) {
  res.sendFile('dist/index.html')
  // response.sendFile(path.resolve('src/client/views/index.html'))
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

// Setup Server
const port = 50001;
const server = app.listen(port, listening => {
    console.log(`running on localhost: ${port}`);
});