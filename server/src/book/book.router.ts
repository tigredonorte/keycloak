import { Router } from 'express';
import Keycloak from 'keycloak-connect';

export const bookRouter = (keycloak: Keycloak.Keycloak) => {
  const router = Router();

  // book:read, any authenticated user can read books
  router.get('/get', keycloak.protect('book:read'), (req, res) => {
    res.send('Access granted to read books');
  });

  // book:edit, only author can edit books
  router.put('/edit', keycloak.protect('book:admin'), (req, res) => {
    res.send('Access granted to edit books');
  });

  // book:delete, only admin and author can delete books
  router.delete('/delete/:id', keycloak.protect('book:delete'), (req, res) => {
    res.send(`Access granted to delete book with id ${req.params.id}`);
  });

  return router;
};
