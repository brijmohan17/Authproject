import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './database/connection.js';
import router from './router/rotue.js';
// Set up global .env access
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || '8080';

// Middlewares
app.use(express.json());
app.use(cors({
  origin:["http://localhost:5173","https://authproject-frontend.vercel.app"]
}));
// app.use(cors());

// app.disable('x-powered-by');

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
// export const handler = serverless(app);   
// export default serverless(app);



