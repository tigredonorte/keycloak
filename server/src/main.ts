import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { bookRouter } from './book/book.router';
import { configureMiddlewares } from './middlewares';
import { getKeycloak } from './middlewares/keycloak';

export const server = async () => {

  console.log('Initializing Realm...');

  const app = express();
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));
  app.use(express.json());
  configureMiddlewares(app);

  const kc = getKeycloak();
  app.get('/', (req, res) => res.status(200).send('Hello World'));
  app.use('/book', bookRouter(kc));

  app.get('/secured', kc.protect(), (req, res) => {
    res.status(200).json('This is a secured endpoint!');
  });

  app.use(function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    res.statusCode = 500;
    console.error(err);
    res.json({ error: err.message });
  });

  const port = process.env.APP_PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
