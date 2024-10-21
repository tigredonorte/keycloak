import { kcAdminClient, realmName } from "./kcAdminClient";
import { ClientConfigType, IdentityProviderConfigType, RealmConfigType } from "./realm.types";

export async function authenticateKeycloak() {
  try {
    await kcAdminClient.auth({
      username: process.env.KC_BOOTSTRAP_ADMIN_USERNAME,
      password: process.env.KC_BOOTSTRAP_ADMIN_PASSWORD,
      grantType: 'password',
      clientId: 'admin-cli',
    });

    console.log(`Authenticated with Keycloak realm: ${process.env.REALM}`);
  } catch (error) {
    console.error('Failed to authenticate with Keycloak:', error);
    throw error;
  }
}

export async function upsertRealm(realmConfig: RealmConfigType) {
  try {
    const realmExists = await kcAdminClient.realms.findOne({ realm: realmName });

    if (realmExists) {
      await kcAdminClient.realms.update({ realm: realmName }, realmConfig);
      console.log(`Realm ${process.env.REALM} updated successfully.`);
    } else {
      await kcAdminClient.realms.create(realmConfig);
      console.log(`Realm ${process.env.REALM} created successfully.`);
    }
  } catch (error) {
    console.error(`Failed to upsert realm ${process.env.REALM}:`, error);
    throw error;
  }
}

export async function createClient(clientConfig: ClientConfigType) {
  try {
    const clientExists = await kcAdminClient.clients.find({ clientId: clientConfig.clientId });
    if (clientExists.length === 0) {
      const client = await kcAdminClient.clients.create(clientConfig);
      console.log(`Client ${clientConfig.clientId} created successfully.`);
    } else {
      console.log(`Client ${clientConfig.clientId} already exists.`);
    }
  } catch (error) {
    console.error(`Failed to create client ${clientConfig.clientId}:`, error);
    throw error;
  }
}

export async function updateAdminRole() {
  try {
    const roles = await kcAdminClient.roles.find({ name: 'admin' } as any);
    if (roles.length > 0) {
      const roleId = roles[0].id as string;
      await kcAdminClient.roles.updateById({ id: roleId }, { description: 'Updated admin role' });
      console.log('Admin role updated.');
    } else {
      console.log('Admin role not found.');
    }
  } catch (error) {
    console.error('Failed to update admin role:', error);
    throw error;
  }
}

export async function createIdentityProvider(identityProviderConfig: IdentityProviderConfigType) {
  try {
    const identityProviders = await kcAdminClient.identityProviders.find({ realm: process.env.REALM });

    const identityProviderExists = identityProviders.some(provider => provider.alias === identityProviderConfig.alias);

    if (!identityProviderExists) {
      await kcAdminClient.identityProviders.create(identityProviderConfig);
      console.log(`Identity provider ${identityProviderConfig.alias} created successfully.`);
    } else {
      console.log(`Identity provider ${identityProviderConfig.alias} already exists.`);
    }
  } catch (error) {
    console.error(`Failed to create identity provider ${identityProviderConfig.alias}:`, error);
    throw error;
  }
}
