const express = require('express');
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createReview,
    deleteReview,
    getReviews,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/product/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);

router.route('/review').put(isAuthenticatedUser, createReview).get(getReviews).delete(deleteReview);

// Admin routes
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

module.exports = router;
