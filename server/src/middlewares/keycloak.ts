import { Application } from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';

let kc: Keycloak.Keycloak;
export function configureKeycloak(app: Application): void {

  console.log('process.env.KEYCLOAK_CLIENT_ID', process.env.KEYCLOAK_CLIENT_ID);
  if (!process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_CLIENT_SECRET || !process.env.KEYCLOAK_REALM) {
    throw new Error('Please provide KEYCLOAK_CLIENT_ID and KEYCLOAK_CLIENT_SECRET and KEYCLOAK_REALM');
  }

  const memoryStore = new session.MemoryStore();

  kc = new Keycloak({ store: memoryStore },  {
    'auth-server-url': `http://${process.env.KC_HOSTNAME}:${process.env.KEYCLOAK_PORT}/auth`,
    realm: process.env.KEYCLOAK_REALM,
    'ssl-required': process.env.KEYCLOAK_SSL_REQUIRED || 'none',
    resource: process.env.KEYCLOAK_CLIENT_ID,
    'confidential-port': 0,
    'bearer-only': true,
  });

  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }));

  app.use(kc.middleware());
}

export const getKeycloak = () => kc;