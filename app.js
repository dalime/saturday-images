// INITIALIZE ENV. VARIALBES
require('dotenv').config();

// CONSTANTS
const PORT = process.env.PORT || 8000;

// REQUIRES
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// APP DECLARATION
const app = express();

// VIEW CONFIG
app.set('view engine', 'ejs');
//app.set('views', './views'); <---- unneeded b/c default

// GENERAL MIDDLEWARE
app.use(morgan('dev')); //console logs requests as we get them
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //for front end

// FRONT END ROUTE
app.get('/', (req, res) => {
  res.render('index'); // serves out frontend to HTML
});

// ROUTES are in routes/images.js
app.use('/images', require('./routes/images')); // '/images' defines route of router

// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
