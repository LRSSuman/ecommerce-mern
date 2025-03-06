const express = require('express');
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { isAuthenticated, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/products').get(isAuthenticated, getProducts);
router.route('/product/new').post(isAuthenticated, authorizeRoles('admin'), newProduct);
router.route('/product/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
