import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

export const realmName = process.env.REALM || 'myRealm';
const baseUrl = `http://${process.env.KC_HOSTNAME}:${process.env.KEYCLOAK_PORT}`;
export const kcAdminClient = new KeycloakAdminClient({
  baseUrl,
  realmName,
});
