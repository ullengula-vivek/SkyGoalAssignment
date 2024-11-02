import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config();

const seedDB = async () => {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    
    const passwordHash = await bcrypt.hash('password007', 10);
    const user = new User({
        username: 'testuser',
        password: passwordHash,
    });

    await user.save();
    console.log('User created');
    await mongoose.disconnect();
};

seedDB().catch((err) => {
    console.err(err);
    process.exit(1);
});

