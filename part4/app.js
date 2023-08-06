import express from 'express';
import cors from 'cors';
import { BlogRouter } from './Controllers/BlogRouter.js';
import { errorHandler } from './Middlewares/ErrorHandler.js';
import { unknownEndpoint } from './Middlewares/UnknownEndpoint.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/blogs', BlogRouter);

app.get('/', (req, res) => {
  res.send('<a href="/api/blogs">/api/blogs</a>');
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
