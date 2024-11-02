import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, {expiresIn: '1h'});
};

export const signup = async(req,res) => {
    const {username, password} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error: "User already exists"});
        }

        const user = new User({username, password: await bcrypt.hash(password, 10)});
        await user.save();
        res.status(201).json({message: "User created successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Server error"});
    }
};

export const login = async (req,res) => {
    const {username , password} = req.body;
    try{
        const user = await User.findOne({username});
        if(user && (await user.comparePassword(password))){
            res.json({token: generateToken(user._id)});
        }else{
            res.status(400).json({error: 'Invalid credentials'});
        }
    } catch(error){
        res.status(500).json({error: 'Server error'});
    }
};

export const userDetails = async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }   catch(error){
        res.status(500).json({error:'Server errorr'});
    }
};
