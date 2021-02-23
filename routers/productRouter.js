const express = require('express');
const middlewares = require('../middlewares/validation');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/',
  middlewares.isValidName,
  middlewares.isValidQuantity,
  productController.add,
);

router.get('/', productController.getAll);

router.get('/:id', productController.show);

router.put('/:id',
  middlewares.isValidName,
  middlewares.isValidQuantity,
  productController.edit,
);

router.delete('/:id', productController.remove);

module.exports = router;
