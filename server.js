import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectdb from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/CategoryRoute.js'
import productRoute from './routes/ProductRoute.js'
import cors from 'cors';

// Initialize express app
const app = express();

// Config env
dotenv.config();

// Database config
connectdb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
 app.use('/api/v1/auth', authRoutes);
 app.use('/api/v1/category', categoryRoute);
 app.use('/api/v1/product', productRoute);



// REST API
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the E-commerce website</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// Run listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
