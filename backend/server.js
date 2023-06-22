import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import products from './data/products.js'
import cors from 'cors'
const port= process.env.PORT || 5000;

const app= express();
app.use(cors())

app.get('/', (req, res, next) => {
    res.send(`I am running bitch`);
});

app.get('/api/products', (req, res, next)=>{
    res.json(products)
});

app.get('/api/products/:id', (req, res, next) => {
    const product=products.find((p) => String(p._id)===req.params.id);
    
    res.json(product);
});


app.listen(port, () =>{console.log(`Server is running on http://localhost:${port}`)});