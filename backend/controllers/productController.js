import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
// import {notFound, errorHandler} from '../middleware/errorMiddleware.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  //withpur pagination and keyword  
  // const products = await Product.find({})

  // const pageSize = process.env.PAGINATION_LIMIT;
  // const page = Number(req.query.pageNumber) || 1;
  // console.log(req.query.keyword)

  const keyword = 
  req.query.keyword==='ctg'
  ? ( {
    gender: {
      $eq: req.query.ctg,

    },
  }
  ) : req.query.keyword ? (
    {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },

    }
  ) 
  : {};

  // const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));

  // res.json({ products, page, pages: Math.ceil(count / pageSize) });
  res.json(products);
})

// @desc   Fetch single products
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product)
    return res.json(product);

  res.status(404);
  throw new Error('Product not found');
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  console.log("Reached cont")
  const product = new Product({
    // user: req.user._id,
    user: "64b933d4d01c578b11d3524a",
    name: 'Sample name',
    image: "https://i.ytimg.com/",
    cloth: 'Fabric',
    pricing: 0,
    gender: 'N/A',
    brand: 'Sample brand',
    in_stock: 0,
    reviewCount: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, pricing, description, image, brand, category, in_stock, cloth } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    product.cloth = cloth;
    product.pricing = pricing;
    product.description = description;
    product.gender = category;
    product.in_stock = in_stock;
    product.brand = brand;

    // console.log(product)
    try {
      const updatedProduct = await product.save();
      res.json(updatedProduct);
      // Code to handle the successful execution of the product.save() method
    } catch (error) {
      // Code to handle the error
      console.error('An error occurred:', error);
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const {
    rating,
    comment,
    user
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.review.find(
      // (r) => r.user.toString() === req.user._id.toString()
      (r) => r.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      // name: req.user.name,
      name: user.name,
      rating: Number(rating),
      comment,
      user: user._id,
      // user: req.user._id,
    };

    product.review.push(review);

    product.numReviews = product.review.length;

    product.rating =
      product.review.reduce((acc, item) => item.rating + acc, 0) /
      product.review.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});





export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,

}
