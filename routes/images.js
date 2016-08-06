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

/*
Image (titlecased singular) ---> model
image (lowercased singular) ---> one image object
images (lowercased plural) ---> array of image objects
*/

router.get('/:id', (req, res) => {
  Image.getOne(req.params.id)
    .then(image => {
      res.send(image);
    })
    .catch(err => {
      res.status(400).send(err);
    })
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

router.put('/:id', (req, res) => {
  Image.update(req.params.id, req.body)
    .then(() => {
      return Image.getOne(req.params.id); //returns a promise of an image
    }) //chained promises
    .then(image => {
      res.send(image); //returns image once promise is returned from above
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

module.exports = router;
