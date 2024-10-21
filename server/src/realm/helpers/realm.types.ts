import { kcAdminClient } from "./kcAdminClient";

export type ClientConfigType = NonNullable<Parameters<typeof kcAdminClient.clients.create>[0]>;
export type GroupConfigType = NonNullable<Parameters<typeof kcAdminClient.groups.create>[0]>;
export type IdentityProviderConfigType = NonNullable<Parameters<typeof kcAdminClient.identityProviders.create>[0]>;
export type RealmConfigType = NonNullable<Parameters<typeof kcAdminClient.realms.create>[0]>;
export type RoleConfigType = NonNullable<Parameters<typeof kcAdminClient.roles.create>[0]>;
export type SmtpServerConfigType = NonNullable<NonNullable<RealmConfigType['smtpServer']>>;
export type UserConfigType = NonNullable<Parameters<typeof kcAdminClient.users.create>[0]>;
export type ResourceConfigType = NonNullable<Parameters<typeof kcAdminClient.clients.createResource>[1]>;
export type PermissionConfigType = NonNullable<Parameters<typeof kcAdminClient.clients.createPermission>[1]>;
export type PolicyConfigType = NonNullable<Parameters<typeof kcAdminClient.clients.createPolicy>[1]>;

// Exporting enums for Roles and Groups
export enum RoleType {
  admin = 'admin',
  manager = 'manager',
  user = 'user',
}

export enum GroupConfigEnum {
  admin = 'Admin',
  manager = 'Manager',
  user = 'User',
}
