const express = require('express');
const router = express.Router(); // Router is title cased

// ROUTES
const Image = require('../models/image.js'); // bring in image model

router.get('/', (req, res) => {
  Image.getAll()
    .then(images => {
      res.send(images);
    })
    .catch(err => {
      res.status(400).send(err);
    });
})

router.post('/', (req, res) => {
  Image.create(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.delete('/:id', (req, res) => {
  Image.delete(req.params.id) //pulls id out of url
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
})

module.exports = router;
