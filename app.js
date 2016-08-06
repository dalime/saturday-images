// CONSTANTS
const PORT = process.env.PORT || 8000;

// REQUIRES
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// APP DECLARATION
const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev')); //console logs requests as we get them
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //for front end

// ROUTES


// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
