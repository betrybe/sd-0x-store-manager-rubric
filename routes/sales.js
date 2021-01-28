/** PRODUCTS ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/:id', controllers.sales.indexId);
router.put(
  '/:id',
  middlewares.validateMiddleware.validateSale,
  controllers.sales.update,
);
router.delete('/:id', controllers.sales.deleteS);
router.get('/', controllers.sales.index);
router.post(
  '/',
  middlewares.validateMiddleware.validateSale,
  controllers.sales.create,
);

module.exports = router;
