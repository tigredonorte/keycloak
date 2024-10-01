import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from 'express';

dotenv.config({ path: __dirname + '/../.env' });

export default async () => {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => res.status(200).send('Hello World'));
  app.use(function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    res.statusCode = 500;
    console.error(err);
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}
