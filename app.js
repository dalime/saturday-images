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

// GENERAL MIDDLEWARE
app.use(morgan('dev')); //console logs requests as we get them
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //for front end

// ROUTES
let Image = require('./models/image.js'); // bring in image model

app.get('/images', (req, res) => {
  Image.getAll()
    .then(images => {
      res.send(images);
    })
    .catch(err => {
      res.status(400).send(err);
    });
})

app.post('/images', (req, res) => {
  /*
  {
  title:
  url:
  description:
}
*/
  Image.create(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
