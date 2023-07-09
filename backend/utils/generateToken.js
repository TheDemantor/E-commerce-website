import jwt from 'jsonwebtoken';
const generateToken = ( res, userId ) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '10d'});

        //Set JWT as a HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV!=='development',
            sameSite: 'strict',
            maxAge: 10*24*60*60*1000, //in milliseconds
        })

}

export default generateToken;
