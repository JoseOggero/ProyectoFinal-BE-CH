const express = require('express');
const UserRepository = require('../repositories/UserRepository');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = await UserRepository.createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

