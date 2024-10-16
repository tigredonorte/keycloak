import { Application } from 'express';
import { configureKeycloak } from './keycloak';

export function configureMiddlewares(app: Application): void {
  configureKeycloak(app);
}

