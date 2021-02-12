// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
/*Listening Port*/
const port = 2828;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
  console.log(`Server is up and running on: http://localhost:${port}`);
});

//Get All Data By The: http://localhost:4800/getAll
app.get('/getAll', (req, res) => {
  res.send(projectData).status(200).end();
});

//Post Data By The: http://localhost:4800/postData
app.post('/postData', (req, res) => {
  //Post Data Now
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.send(projectData).status(404).end();
});
