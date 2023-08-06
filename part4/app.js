import express from 'express';
import cors from 'cors';
import { BlogRouter } from './Controllers/BlogRouter.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/blogs', BlogRouter);

app.get('/', (req, res) => {
  res.send('<a href="/api/blogs">/api/blogs</a>');
});

export default app;
