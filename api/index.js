// api/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('../config/database');
const orderRoutes = require('../routes/orders');
const authRoutes = require('../routes/auth');

const app = express();

app.use(cors({
  origin: ['https://my-zubster-app.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'MyZubster Backend'
  });
});

let isConnected = false;

const connectToDb = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

module.exports = async (req, res) => {
  await connectToDb();
  return app(req, res);
};