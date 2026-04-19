const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../models/user');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'supersecretkey';

// Регистрация
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Логин
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
  res.json({ token, user });
});

module.exports = router;
