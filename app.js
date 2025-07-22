import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

/**
 * =============================
 * Subscription Tracker Backend
 * Express.js Server Configuration
 * =============================
 * 
 * This file initializes the Express application, sets up middleware, and defines routes
 * for handling authentication, user management, and subscription tracking.
 * 
 * Key Components:
 * - Express middlewares for JSON parsing, URL-encoded data, and cookie handling.
 * - Route handlers for:
 *    - Authentication (/api/v1/auth)
 *    - User Management (/api/v1/users)
 *    - Subscription Management (/api/v1/subscriptions)
 * - Global Error Handling Middleware for catching runtime errors.
 * - Root route ("/") to check server status.
 * - Server starts listening on configured PORT and establishes MongoDB connection.
 * 
 * This is the entry point of the Subscription Tracker API.
 */


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API');
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    
    await connectToDatabase();
});

export default app;