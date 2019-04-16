const express = require('express');
const router = express.Router();
const upload = require('../helpers/multerMiddleware');
const VillesController = require('../controllers/VillesController');


router.get('/', VillesController.all);

router.get('/attributs', VillesController.attributs);

router.post('/add', upload.array('images'), VillesController.add);

router.post('/edit/:id', VillesController.edit);

router.get('/delete/:id', VillesController.delete);

router.get('/:id', VillesController.single);


module.exports = router;