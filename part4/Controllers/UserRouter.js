import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../Config/config.js';
import { UserModel } from '../Models/UserModel.js';

const URI = config.determineURI();
const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);

    const data = await UserModel.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });

    const response = {
      success: true,
      user_list: data,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

UserRouter.post('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const { username, name, password } = req.body;

    // validate
    const isEmpty =
      username.length === 0 || password.length === 0 || name.length === 0;
    if (isEmpty) {
      res.status(400).json({
        error: 'MISSING_INPUT',
        message: 'The username, name, and password must not be empty',
      });
      return;
    }
    const invalidLength = username.length < 3 || password.length < 3;
    if (invalidLength) {
      res.status(400).json({
        error: 'INVALID_REGISTRATION_CREDENTIALS',
        message: 'The username and password must have at least 3 characters',
      });
      return;
    }
    // check uniquessness of username
    const doesUserExist = await UserModel.findOne({ username });
    if (doesUserExist) {
      res.status(409).json({
        error: 'USERNAME_ALREADY_EXISTS',
        message:
          'The provided username is already in use. Please choose another username',
      });
      return;
    }

    // valid registration details
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const new_user = new UserModel({
      username,
      name,
      password: passwordHash,
    });

    const data = await UserModel.create(new_user);

    const response = {
      success: true,
      newly_created_user: data,
    };
    res.json(response);
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
});

export { UserRouter };
