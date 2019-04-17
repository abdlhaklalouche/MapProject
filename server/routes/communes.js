const express = require('express');
const router = express.Router();
const upload = require('../helpers/multerMiddleware');
const CommunesController = require('../controllers/CommunesController');

router.get('/', CommunesController.all);

router.get('/attributs', CommunesController.attributs);

router.post('/add', upload.array('images'), CommunesController.add);

router.post('/edit/:id', upload.array('images'), CommunesController.edit);

router.get('/delete/:id', CommunesController.delete);

router.get('/images/delete/:id', CommunesController.deleteImage);

router.get('/:id', CommunesController.single);


module.exports = router;