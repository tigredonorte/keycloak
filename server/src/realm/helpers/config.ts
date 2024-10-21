import { RealmConfigType } from "./realm.types";

export const getIdentityProviders = () => {
  const identityProviders: any[] = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    identityProviders.push({
      alias: 'google',
      providerId: 'google',
      enabled: true,
      // updateProfileFirstLoginMode: 'on',
      // authenticateByDefault: false,
      storeToken: false,
      addReadTokenRoleOnCreate: false,
      trustEmail: false,
      config: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        defaultScope: 'email profile',
      },
    })
  }

  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    identityProviders.push({
      alias: 'facebook',
      providerId: 'facebook',
      enabled: true,
      config: {
        clientId: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        defaultScope: 'email public_profile',
      },
    })
  }
  return identityProviders;
}

export const getRealmConfig = (): RealmConfigType => ({
  realm: process.env.REALM,
  enabled: true,
  registrationAllowed: true,
  resetPasswordAllowed: true,
  rememberMe: true,
  verifyEmail: false,
  loginWithEmailAllowed: true,
  internationalizationEnabled: true,
  registrationEmailAsUsername: true,
  editUsernameAllowed: true,
  defaultLocale: 'en',
  smtpServer: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
    fromDisplayName: process.env.SMTP_USER_DISPLAY_NAME,
    auth: 'true',
    starttls: 'false',
    ssl: 'false',
  },
  userManagedAccessAllowed: true,
  clients: [
    {
      clientId: 'frontend-client',
      enabled: true,
      protocol: 'openid-connect',
      publicClient: true,
      redirectUris: [`${process.env.FRONTEND_URL}/*`],
      webOrigins: [`+(${process.env.FRONTEND_URL})`],
      rootUrl: process.env.FRONTEND_URL,
      directAccessGrantsEnabled: true,
      standardFlowEnabled: true,
      implicitFlowEnabled: false,
      serviceAccountsEnabled: false,
      clientAuthenticatorType: 'client-secret',
    },
    {
      clientId: 'backend-client',
      enabled: true,
      protocol: 'openid-connect',
      publicClient: false,
      secret: process.env.BACKEND_CLIENT_SECRET,
      directAccessGrantsEnabled: false,
      standardFlowEnabled: true,
      serviceAccountsEnabled: true,
      clientAuthenticatorType: 'client-secret',
    },
  ],
  roles: {
    realm: [
      {
        name: 'admin',
        description: 'Admin with full permissions',
      },
      {
        name: 'manager',
        description: 'Manager with create, read, and edit own data permissions',
      },
      {
        name: 'user',
        description: 'User with read-only permissions',
      },
    ],
  },
  groups: [
    {
      name: 'Admin',
      attributes: {
        description: ['Administrative users with full access'],
      },
      realmRoles: ['admin'],
    },
    {
      name: 'Manager',
      attributes: {
        description: ['Manager users with specific access'],
      },
      realmRoles: ['manager'],
    },
    {
      name: 'User',
      attributes: {
        description: ['Regular users with limited access'],
      },
      realmRoles: ['user'],
    },
  ],
  users: [
    {
      username: 'admin',
      enabled: true,
      emailVerified: false,
      firstName: process.env.APP_ADMIN_NAME,
      lastName: process.env.APP_ADMIN_LAST_NAME,
      email: process.env.APP_ADMIN_EMAIL,
      groups: ['Admin'],
      realmRoles: ['admin'],
      attributes: {
        verifyEmail: 'true',
      },
      requiredActions: ['VERIFY_EMAIL', 'CONFIGURE_TOTP'],
      credentials: [
        {
          type: 'password',
          value: process.env.APP_ADMIN_PASSWORD,
          temporary: true,
        },
      ],
    },
  ],
  identityProviders: getIdentityProviders(),
});
