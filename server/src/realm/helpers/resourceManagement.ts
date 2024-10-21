import { kcAdminClient } from "./kcAdminClient";
import { PermissionConfigType, PolicyConfigType, ResourceConfigType } from "./realm.types";

export const createResource = async (clientId: string, resourceId: string, userId: string, realm: string = 'master') => {
  const resourcePayload: ResourceConfigType = {
    name: resourceId,
    owner: { id: userId },
    ownerManagedAccess: true,
    uris: [`/books/${resourceId}`],
    type: 'book',
  };

  const resource = await kcAdminClient.clients.createResource(
    { id: clientId, realm },
    resourcePayload
  );

  return resource;
};

export const createPermission = async (clientId: string, permissionName: string, resourceName: string, realm: string = 'master') => {
  const permissionPayload: PermissionConfigType = {
    name: permissionName,
    resources: [resourceName],
    policies: ['owner-only-policy', 'organization-access-policy'],
  };

  const permission = await kcAdminClient.clients.createPermission(
    { id: clientId, type: 'resource', realm },
    permissionPayload
  );

  return permission;
};

export const createPolicy = async (clientId: string, policyName: string, roleId: string, realm: string = 'master') => {
  const policyPayload: PolicyConfigType = {
    name: policyName,
    type: 'role',
    roles: [
      {
        id: roleId,
        required: true,
      },
    ],
  };

  const policy = await kcAdminClient.clients.createPolicy(
    { id: clientId, type: 'role', realm },
    policyPayload
  );

  return policy;
};

export const updatePermission = async (clientId: string, permissionId: string, realm: string = 'master') => {
  const permissionPayload: PermissionConfigType = {
    policies: ['owner-only-policy', 'organization-access-policy'],
    resources: ['book123'],
  };

  await kcAdminClient.clients.updatePermission(
    { id: clientId, type: 'resource', permissionId, realm },
    permissionPayload
  );
};