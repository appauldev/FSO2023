import express from 'express';
import cors from 'cors';
import { BlogRouter } from './Controllers/BlogRouter.js';
import { RegistrationRouter } from './Controllers/RegistrationRouter.js';
import { LoginRouter } from './Controllers/LoginRouter.js';
import { errorHandler } from './Middlewares/ErrorHandler.js';
import { unknownEndpoint } from './Middlewares/UnknownEndpoint.js';
import { UserRouter } from './Controllers/UserRouter.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/blogs', BlogRouter);
app.use('/api/users/register', RegistrationRouter);
app.use('/api/users/login', LoginRouter);
app.use('/api/users', UserRouter);

app.get('/', (req, res) => {
  res.send('<a href="/api/blogs">/api/blogs</a>');
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
