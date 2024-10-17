import cors from 'cors';
import { Application } from 'express';

export function configureCors(app: Application): void {
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost',
    credentials: true,
  }));
}