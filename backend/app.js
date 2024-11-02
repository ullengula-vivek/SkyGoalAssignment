import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifieedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error('MongoDB connection error', err));

const PORT = process.env.PORT  || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));