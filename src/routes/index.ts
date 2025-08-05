import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World from routes!');
});

router.get('/about', (req, res) => {
  res.json({ message: 'About page' });
});

export default router;