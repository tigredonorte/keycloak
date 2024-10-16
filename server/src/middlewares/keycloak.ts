import Keycloak from 'keycloak-connect';
import session from 'express-session';
import { Application } from 'express';

const memoryStore = new session.MemoryStore();

const keycloakConfig = {
  'confidential-port': 0, // Use 0 if not using a specific SSL port
  'auth-server-url': `http://${process.env.KC_HOSTNAME}:${process.env.KEYCLOAK_PORT}`,
  realm: process.env.KEYCLOAK_REALM || 'myrealm',
  resource: process.env.KEYCLOAK_CLIENT_ID || 'my-app',
  'ssl-required': process.env.KEYCLOAK_SSL_REQUIRED || 'none',
  credentials: {
    secret: process.env.KEYCLOAK_CLIENT_SECRET || 'your-client-secret',
  },
};

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

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
