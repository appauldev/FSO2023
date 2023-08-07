import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from '../Models/UserModel.js';
import config from '../Config/config.js';

const URI = config.determineURI();
const LoginRouter = express.Router();
LoginRouter.use(express.json());

LoginRouter.post('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const { username, password } = req.body;

    // check if username exists in the db
    const existingUser = await UserModel.findOne({ username });
    // immediate return if usernmae does not exist
    if (!existingUser) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Invalid username or password',
      });
      return;
    }
    // check if correct password
    const is_password_correct = await bcrypt.compare(
      password,
      existingUser.password
    );
    // immediate return if wrong password
    if (!is_password_correct) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Invalid username or password',
      });
      return;
    }
    // we coould just simply return `success: true`
    // but it's good to have some safeguards for ~unexpected events
    if (existingUser && is_password_correct) {
      res.json({
        success: true,
      });
    } else {
      res.status(500).json({
        error: 'SERVER_ERROR',
        message: 'Please check the logs for the error',
      });
    }
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
});

export { LoginRouter };
