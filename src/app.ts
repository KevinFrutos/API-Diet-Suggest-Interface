import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './infrastructure/routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRoutes);

export default app;
