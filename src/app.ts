import express from 'express';
import Sentry from "./infrastructure/logging/sentry";
import dotenv from 'dotenv';
import authRoutes from './infrastructure/routes/authRoutes';
import suggestRoutes from "./infrastructure/routes/suggestRoutes";
import userAttributesRutes from "./infrastructure/routes/userAttributesRutes";

dotenv.config();

const app = express();

Sentry.setupExpressErrorHandler(app);

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user/attributes', userAttributesRutes);
app.use('/api/v1/diet', suggestRoutes);

export default app;
