/** PRODUCTS ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/:id', controllers.products.indexId);
router.delete('/:id', controllers.products.deleteP);
router.put(
  '/:id',
  middlewares.validateMiddleware.validateProduct(),
  middlewares.validateMiddleware.validate,
  controllers.products.update,
);
router.get('/', controllers.products.index);
router.post(
  '/',
  middlewares.validateMiddleware.validateProduct(),
  middlewares.validateMiddleware.validate,
  controllers.products.create,
);

module.exports = router;
