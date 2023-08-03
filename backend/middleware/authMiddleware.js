import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protect Routes
export const protect = asyncHandler( async(req, res, next)=>{
    // next();
    console.log(req.cookies);
    let token = req.cookies.jwt;
    // console.log("req.cookies");
    // console.log(req);
    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = await User.findById(decode.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Token failed');
            
        }
    }
    else{
        res.status(401);
        throw new Error('No authorisation, No token found');
    }
});


//Admin middleware
export const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('No authorisation for admin routes');
    }
};