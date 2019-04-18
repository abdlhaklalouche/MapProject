const express = require('express');
const router = express.Router();
const upload = require('../helpers/multerMiddleware');
const ObjetsController = require('../controllers/ObjetsController');

router.get('/', ObjetsController.all);

router.post('/add', upload.array('images'), ObjetsController.add);

router.post('/edit/:id', upload.array('images'), ObjetsController.edit);

router.get('/delete/:id', ObjetsController.delete);

router.get('/images/delete/:id', ObjetsController.deleteImage);

router.get('/:id', ObjetsController.single);

module.exports = router;