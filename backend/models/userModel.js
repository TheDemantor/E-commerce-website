import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},{
    timestamps: true,
});

userSchema.pre('save', async function (next) { 
    if(!this.isModified('password')) {//if we are dealing with some other user data not the password teh it will just move on
        next();
    }
    else{//if it is a password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}) 

userSchema.methods.matchPassword = async function(enteredPassword){
    const result=await bcrypt.compare(enteredPassword, this.password);
    console.log(result);
    return  result;
}

const User = mongoose.model("User", userSchema);

export default User;