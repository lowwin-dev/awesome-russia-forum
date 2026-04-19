const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../models/category');

router.get('/', async (req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
});

module.exports = router;
