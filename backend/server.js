import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'; //from this we can access req.cookie
const port= process.env.PORT || 5000;

connectDB();    //Connect to mongoDB

const app= express();
app.use(cors())

//BODY PARSER MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`I am running bitch`);
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);



app.listen(port, () =>{console.log(`Server is running on http://localhost:${port}`)});