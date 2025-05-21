import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app: Express = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import postRoutes from './routes/posts.routes.js';
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.use(errorHandler);

export default app;
