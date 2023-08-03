import express from 'express';
const router = express.Router();
// import Product from '../models/productModel.js';
// import asyncHandler from '../middleware/asyncHandler.js';

//FROM CONTROLLER
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js'

//THIS WAS BEFORE WE USED THE CONTROLLERS
// router.get('/', asyncHandler(async (req, res)=>{
//     const products = await Product.find({})
//     res.json(products)
// }));

// router.get('/:id', asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if(product)
//     return res.json(product);
    
//     res.status(404);
//     throw new Error();
// }));

//AFTER CONTROLLER HAS BEEN SETUP WE ONLY NEED THIS 
// router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/').get(getProducts).post( createProduct);

router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

router.route('/:id/reviews').post( createProductReview);
// router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

;

export default router;