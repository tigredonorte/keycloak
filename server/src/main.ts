import express, { NextFunction, Request, Response } from 'express';
import { configureMiddlewares } from './middlewares';
import keycloak from './middlewares/keycloak';

export default async () => {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => res.status(200).send('Hello World'));
  configureMiddlewares(app);
  
  app.use(function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    res.statusCode = 500;
    console.error(err);
  });

  app.get('/secured', keycloak.protect(), (req, res) => {
    res.send('This is a secured endpoint.');
  });

  const port = process.env.APP_PORT || 3005;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
