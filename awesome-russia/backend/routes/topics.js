const express = require('express');
const router = express.Router();
const { createTopic, getTopicsByCategory } = require('../models/topic');
const authMiddleware = require('../middleware/auth');

router.get('/category/:id', async (req, res) => {
  const topics = await getTopicsByCategory(req.params.id);
  res.json(topics);
});

router.post('/', authMiddleware, async (req, res) => {
  const { category_id, title } = req.body;
  const topic = await createTopic(category_id, req.user.id, title);
  res.json(topic);
});

module.exports = router;
