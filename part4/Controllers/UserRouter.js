import express from 'express';
import mongoose from 'mongoose';
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

export { UserRouter };
