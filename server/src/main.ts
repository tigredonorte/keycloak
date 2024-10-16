import express, { NextFunction, Request, Response } from 'express';
import { configureMiddlewares } from './middlewares';

export default async () => {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => res.status(200).send('Hello World'));
  configureMiddlewares(app);
  
  app.use(function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    res.statusCode = 500;
    console.error(err);
  });

  const port = process.env.APP_PORT || 3005;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
