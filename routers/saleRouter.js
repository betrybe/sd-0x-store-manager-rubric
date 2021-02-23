const express = require('express');
const middlewares = require('../middlewares/validation');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/',
  middlewares.isValidQuantity,
  saleController.add,
);

router.get('/', saleController.getAll);

router.get('/:id', saleController.show);

router.put('/:id',
  middlewares.isValidQuantity,
  saleController.edit,
);

router.delete('/:id', saleController.remove);

module.exports = router;
