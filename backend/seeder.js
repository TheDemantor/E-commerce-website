import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from './models/productModel.js';
import Order from "./models/orderSchema.js";
import connectDB from './config/db.js';

dotenv.config();

//connect ot the database
connectDB();


const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser= createdUsers[0]._id;

        const sampleProducts = products.map((product)=>{
            return { ...product, user: adminUser};
        });

        const createdProducts = await Product.insertMany(sampleProducts);

        console.log("Data imported".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        
        console.log('Data deleted successfully !!!'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2]==='-d'){
    destroyData();
}
else {
    importData();
}