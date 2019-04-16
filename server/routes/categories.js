const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/CategoriesController');

router.get('/', CategoriesController.all);

router.post('/add', CategoriesController.add);

router.post('/edit/:id', CategoriesController.edit);

router.get('/:id', CategoriesController.single);

router.get('/delete/:id', CategoriesController.delete);

module.exports = router;