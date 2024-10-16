import Keycloak from 'keycloak-connect';
import session from 'express-session';
import { Application } from 'express';

const config: Keycloak.KeycloakConfig = {
  'auth-server-url': process.env.KEYCLOAK_SERVER_URL || 'http://auth.localhost/',
  'realm': process.env.REALM || 'myrealm',
  'resource': 'backend-client',
  'bearer-only': true,
  'ssl-required': process.env.KEYCLOAK_SSL_REQUIRED || 'none',
  'confidential-port': 0,
}
console.log('Keycloak config', config);

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ 
  store: memoryStore
  
 }, config);

export function configureKeycloak(app: Application): void {
  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }));

  app.use(keycloak.middleware());
}

export default keycloak;
