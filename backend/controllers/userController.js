import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
// import {notFound, errorHandler} from '../middleware/errorMiddleware.js'

// @desc   Auth user
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res)=>{
    console.log(req.body);
    const { email, password } = req.body;
    
    const user= await User.findOne({ email });
    
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(401);
        throw new Error('Incorrect email or password !');
    }

});

// @desc   Register user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res)=>{
    const { name, email, password } = req.body;
    
    const userExist= await User.findOne({ email });
    if(userExist){
        res.status(400);
        throw new Error( `User already exits. Please login`);
    }
    const user = await User.create({name, email, password});
    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid credentials')
    }
    
});

// @desc   logout user / clear cookie
// @route  POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    
    res.status(200).json({message: 'Logged out successfully'});
});

// @desc   get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res, next)=>{
    const user = await User.findOne(req.user._id);
    console.log(user);
    console.log("user");

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
    // res.send('get user profile');
});

// @desc   update user profile
// @route  PUT /api/users/
// @access Private
const updateUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findOne(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
    // res.send('update user profile');
});

//ADMIN REQUESTS
// @desc   get users
// @route  GET /api/users/
// @access Private/Admin
const getUsers = asyncHandler(async (req, res, next)=>{
    res.send('get users');
});

// @desc   get user by id
// @route  GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res, next)=>{
    res.send('get user by id');
});

// @desc   delete users
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res, next)=>{
    res.send('delete users');
});

// @desc   update users
// @route  PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res, next)=>{
    res.send('update users');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile, 
    updateUserProfile,
    getUsers, 
    deleteUser,
    getUserByID,
    updateUser
}