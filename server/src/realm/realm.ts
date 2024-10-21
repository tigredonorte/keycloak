import { mapBookConfig } from './book.config';
import { getRealmConfig } from './helpers/config';
import { authenticateKeycloak, upsertRealm } from './helpers/kcAdmin';
import { upsertClients, upsertGroups, upsertIdentityProviders, upsertRoles } from './helpers/upsertFunctions';

export async function initRealm() {
  try {
    let realmConfig = getRealmConfig();
    realmConfig = mapBookConfig(realmConfig);
    await authenticateKeycloak();
    await upsertRealm(realmConfig);
    await upsertGroups(realmConfig.groups || []);
    await upsertRoles(realmConfig.roles?.realm || []);
    await upsertClients(realmConfig.clients || []);
    await upsertIdentityProviders(realmConfig.identityProviders || []);
  } catch (error) {
    console.error('Error during the upsert process:', error);
  }
}
