import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protect Routes
const protect = asyncHandler( async(req, res, next)=>{
    let token = req.cookies.jwt;
    
    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
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
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('No authorisation for admin routes');
    }
};

export {protect, admin}