import User from "../models/User"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, {expiresIn: '1h'});
};

export const signup = async(req,res) => {
    const {username, password} = req.body;
    try{
        const user = await User.create({username, password});
        res.json({token: generateToken(user._id)});
    }catch(error){
        res.status(400).json({error: 'User already exists'});
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
