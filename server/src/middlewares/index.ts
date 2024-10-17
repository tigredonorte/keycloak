import { Application } from 'express';
import { configureCors } from './cors';
import { configureKeycloak } from './keycloak';

export function configureMiddlewares(app: Application): void {
  configureCors(app);
  configureKeycloak(app);
}

