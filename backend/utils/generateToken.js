import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const generateToken = (res,userId) =>{
  // console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    //Set JWT as HTTP-only cookie
    try{
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    catch(e){
      console.log(e);
    }
}

export default generateToken;