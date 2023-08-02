import express from 'express';
import cors from 'cors';
import config from './Config/config.js';
import { BlogRouter } from './Controllers/BlogRouter.js';
import Logger from './Utils/Logger.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/blogs', BlogRouter);

app.get('/', (req, res) => {
  res.send('<a href="/api/blogs">/api/blogs</a>');
});

app.listen(config.PORT, () => {
  Logger.info(`listening on http://localhost:${config.PORT}`);
});
