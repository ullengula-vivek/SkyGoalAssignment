import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);