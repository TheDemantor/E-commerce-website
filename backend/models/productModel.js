import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    comment: {
        type: String,
    }, 
},{
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    //this will store taht which user has created this object, so we are having this id from our User collection, every item will have a attrubute named _id, and that is this 
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    cloth: {
        type: String,
        required: true,
    },
    pricing: {
        type: Number,
        required: true,
        default:0,
    },
    description: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    review: [reviewSchema],
    reviewCount: {
        type: Number,
        required: true,
    }, 
    in_stock: {
        type: Number,
        required: true,
        default:0,
    },
    brand: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
    //this will auto matically adds the createdAt field for every object
});

//making a mongoose model
const Product = mongoose.model("Product", productSchema);

export default Product;