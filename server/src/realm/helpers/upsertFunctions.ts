import { NetworkError } from '@keycloak/keycloak-admin-client';
import { defaultRealm, kcAdminClient } from './kcAdmin';

export async function upsertRealm(realmConfig: any) {
  try {
    const existingRealm = await kcAdminClient.realms.findOne({ realm: realmConfig.realm || defaultRealm  });

    if (existingRealm) {
      await kcAdminClient.realms.update({ realm: realmConfig.realm || defaultRealm }, realmConfig);
      console.log(`Realm ${realmConfig.realm} updated successfully.`);
    } else {
      await kcAdminClient.realms.create(realmConfig);
      console.log(`Realm ${realmConfig.realm} created successfully.`);
    }
  } catch (error) {
    if (error instanceof NetworkError && error.response && error.response.status === 404) {
      await kcAdminClient.realms.create(realmConfig);
      console.log(`Realm ${realmConfig.realm} created successfully.`);
    } else {
      console.error(`Failed to upsert realm ${realmConfig.realm}:`, error);
      throw error;
    }
  }
}

export async function upsertGroups(groups: any[]) {
  for (const group of groups) {
    try {
      const existingGroups = await kcAdminClient.groups.find({ search: group.name });

      if (existingGroups.length > 0) {
        await kcAdminClient.groups.update({ id: existingGroups[0].id as string }, group);
        console.log(`Group ${group.name} updated successfully.`);
      } else {
        await kcAdminClient.groups.create(group);
        console.log(`Group ${group.name} created successfully.`);
      }
    } catch (error) {
      console.error(`Failed to upsert group ${group.name}:`, error);
      throw error;
    }
  }
}

export async function upsertRoles(roles: { realm: any[]}) {
  for (const role of roles.realm) {
    try {
      const existingRole = await kcAdminClient.roles.findOneByName({ name: role.name as string });

      if (existingRole) {
        await kcAdminClient.roles.updateById({ id: existingRole.id as string }, role);
        console.log(`Role ${role.name} updated successfully.`);
      } else {
        await kcAdminClient.roles.create(role);
        console.log(`Role ${role.name} created successfully.`);
      }
    } catch (error) {
      console.error(`Failed to upsert role ${role.name}:`, error);
      throw error;
    }
  }
}

export async function upsertClients(clients: any[]) {
  for (const client of clients) {
    try {
      const existingClients = await kcAdminClient.clients.find({ clientId: client.clientId });

      if (existingClients.length > 0) {
        await kcAdminClient.clients.update({ id: existingClients[0].id as string }, client);
        console.log(`Client ${client.clientId} updated successfully.`);
      } else {
        await kcAdminClient.clients.create(client);
        console.log(`Client ${client.clientId} created successfully.`);
      }
    } catch (error) {
      console.error(`Failed to upsert client ${client.clientId}:`, error);
      throw error;
    }
  }
}

export async function upsertIdentityProviders(identityProviders: any[]) {
  for (const provider of identityProviders) {
    try {
      const existingProviders = await kcAdminClient.identityProviders.find({ search: provider.alias });

      if (existingProviders.length > 0) {
        await kcAdminClient.identityProviders.update({ alias: provider.alias }, provider);
        console.log(`Identity provider ${provider.alias} updated successfully.`);
      } else {
        await kcAdminClient.identityProviders.create(provider);
        console.log(`Identity provider ${provider.alias} created successfully.`);
      }
    } catch (error) {
      console.error(`Failed to upsert identity provider ${provider.alias}:`, error);
      throw error;
    }
  }
}
