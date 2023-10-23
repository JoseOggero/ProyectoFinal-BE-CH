const express = require('express');
const router = express.Router();
const UserRepository = require('../repositories/UserRepository');

router.get('/admin', async (req, res) => {
  const users = await UserRepository.getAllUsers();
  res.render('adminView', { users });
});

const isAdmin = (req, res, next) => {
    if (usuarioTienePermisosDeAdmin(req.user)) {
      next();
    } else {
      res.status(403).send('Acceso no autorizado');
    }
  };
  
  router.get('/admin', isAdmin, async (req, res) => {
    const users = await UserRepository.getAllUsers();
    res.render('adminView', { users });
  });

module.exports = router;
