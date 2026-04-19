const pool = require('../db');

async function createPost(topic_id, author_id, content) {
  const res = await pool.query(
    'INSERT INTO posts (topic_id, author_id, content) VALUES ($1, $2, $3) RETURNING *',
    [topic_id, author_id, content]
  );
  return res.rows[0];
}

async function getPostsByTopic(topic_id) {
  const res = await pool.query(
    'SELECT p.*, u.username as author_name, u.avatar_url, u.signature FROM posts p JOIN users u ON p.author_id = u.id WHERE p.topic_id=$1 ORDER BY p.created_at ASC',
    [topic_id]
  );
  return res.rows;
}

module.exports = { createPost, getPostsByTopic };
