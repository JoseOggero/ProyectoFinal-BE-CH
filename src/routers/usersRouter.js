const express = require('express');
const router = express.Router();
const UserRepository = require('../repositories/UserRepository');
const EmailService = require('../services/EmailService');

router.get('/', async (req, res) => {
  const users = await UserRepository.getAllUsers();
  const userData = users.map(user => ({
    name: user.name,
    email: user.email,
    accountType: user.accountType,
  }));
  res.json(userData);
});

router.delete('/', async (req, res) => {
  const inactiveUsers = await UserRepository.getInactiveUsers(2);
  for (const user of inactiveUsers) {
    await UserRepository.deleteUser(user._id);
    EmailService.sendInactiveUserEmail(user.email);
  }
  res.json({ message: 'Usuarios inactivos eliminados' });
});

module.exports = router;
