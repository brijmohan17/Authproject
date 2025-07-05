// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connect from './database/connection.js';
import router from './router/rotue.js';   // fix typo if needed: 'route.js'
import serverless from 'serverless-http';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://authproject-frontend.vercel.app',
    ],
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.disable('x-powered-by');

app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ activeStatus: true, error: false });
});

// (Optional) 404 fallback
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

let isDbConnected = false;
async function ensureDb() {
  if (!isDbConnected) {
    await connect();
    isDbConnected = true;
  }
}

// Wrap Express app in serverless handler
async function handler(req, res) {
  try {
    await ensureDb();
    return app(req, res);
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default serverless(handler);
