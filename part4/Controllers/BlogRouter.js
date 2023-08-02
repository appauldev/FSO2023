import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'node:process';
import { BlogModel } from '../Models/BlogModel.js';

dotenv.config({ path: '.env.local' });
const URI = process.env.MONGODB_PART4_CLUSTER0_URI;

const BlogRouter = express.Router();

BlogRouter.use(express.json());

BlogRouter.get('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const data = await BlogModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
});

BlogRouter.post('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const new_blog = req.body;
    const data = await BlogModel.create(new_blog);
    const response = {
      success: true,
      newly_added_blog: data,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export { BlogRouter };
