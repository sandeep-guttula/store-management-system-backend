import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import storeRoutes from './routes/store.routes';
import ratingRoutes from './routes/rating.routes';

import cookieParser from 'cookie-parser';

import helmet from 'helmet';
import compression from 'compression';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());


app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is healthy ✅' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

export { app };