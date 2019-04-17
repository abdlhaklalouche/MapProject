const express = require('express');
const router = express.Router();
const upload = require('../helpers/multerMiddleware');
const CategoriesController = require('../controllers/CategoriesController');

router.get('/', CategoriesController.all);

router.get('/types', CategoriesController.types);

router.post('/add', upload.none(), CategoriesController.add);

router.post('/edit/:id', CategoriesController.edit);

router.get('/:id', CategoriesController.single);

router.get('/delete/:id', CategoriesController.delete);

module.exports = router;