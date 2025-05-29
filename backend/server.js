import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser)

app.get('/', (req, res) => {
  res.send('Server is running');
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
