const express = require('express');
const router = express.Router();
const CommunesController = require('../controllers/CommunesController');

router.get('/', CommunesController.all);

router.get('/attributs', CommunesController.attributs);

router.post('/add', CommunesController.add);

router.post('/edit/:id', CommunesController.edit);

router.get('/delete/:id', CommunesController.delete);

router.get('/:id', CommunesController.single);

module.exports = router;