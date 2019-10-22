import dotenv from 'dotenv';
import express from 'express';

import { quacks, users } from './mocks';

dotenv.config();
dotenv.config({ path: '.env.local' });

const { PORT = 3001 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.userId = 15;
  next();
});

app.use('/quack/:quackId', (req, res, next) => {
  const { quackId } = req.params;
  const quack = quacks.find(item => {
    return Number(item.id) === Number(quackId);
  });
  if (!quack) {
    res.status(404);
    return res.send('not found');
  }

  res.json(quack);
});

app.use('/popularQuacks/:likes', (req, res, next) => {
  const { likes } = req.params;
  const popularQuacks = quacks.filter(item => item.likeCount >= likes);
  res.json(popularQuacks);
});

app.use('/quacks', (req, res, next) => {
  let qucksUsers = quacks;
  qucksUsers.forEach(
    item => (item.user = users.find(u => u.id === item.userId)),
  );
  res.json(qucksUsers);
});

app.use('/user', (req, res, next) => {
  res.send('user');
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started poky on http://localhost:${PORT}!`);
});
