import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connect from './database/connection.js';
import router from './router/rotue.js';
import serverless from 'serverless-http';
// Set up global .env access
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || '8080';

// Middlewares
app.use(express.json());
app.use(cors({
  origin:["http://localhost:3000","https://authproject-frontend.vercel.app"]
}));
// app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.disable('x-powered-by');

// Route API
app.use('/api', router);

app.get('/', (req, res) => {
  res.send({
    activeStatus:true,
    error:false,
  })
});
// app.use((req, res) => {
//     res.status(404).json({ message: 'Route not found' });
// });

// Start server only when we have valid connection
connect()
    .then(() => {
        try {
            app.listen(PORT, () => {
                console.log(`Server is listening on http://localhost:${PORT}`);
            });
        } catch (error) {
            console.log('Cannot connect to the server...!');
        }
    })
    .catch((error) => {
        console.log('Invalid database connection...!', error);
    });
// await connect();
export const handler = serverless(app);    
