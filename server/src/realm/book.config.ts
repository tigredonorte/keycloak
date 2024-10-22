import { RealmConfigType } from "./helpers/realm.types";

function getBookPermissions() {
  
  const bookPermissions = {
    read: 'book:read',
    create: 'book:create',
    admin: 'book:admin',
    delete: 'book:delete',
  };

  const roles = {
    admin: Object.values(bookPermissions),
    manager: [bookPermissions.create, bookPermissions.read, bookPermissions.admin],
    user: [bookPermissions.read],
  };

  const roles2 = [
    {
          name: 'book-admin',
          description: 'Admin with full permissions for books',
          permissions: roles.admin,
        },
        {
          name: 'book-manager',
          description: 'Manager with create, read, and edit own data permissions for books',
          permissions: roles.manager,
        },
        {
          name: 'book-user',
          description: 'User with read-only permissions for books',
          permissions: roles.user,
        },
  ]

  return { bookPermissions, roles };
}

export const mapBookConfig = (realmConfig: RealmConfigType) => {
  const { bookPermissions, roles } = getBookPermissions();

  return {
    ...realmConfig,
  };
}