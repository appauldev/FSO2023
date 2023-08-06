import express from 'express';
import mongoose from 'mongoose';
import { BlogModel } from '../Models/BlogModel.js';
import config from '../Config/config.js';

const URI = config.determineURI();

const BlogRouter = express.Router();

BlogRouter.use(express.json());

BlogRouter.get('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const data = await BlogModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
});

BlogRouter.get('/:id', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const id = req.params.id;
    const data = await BlogModel.findById(id);
    // console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
});

BlogRouter.post('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    let new_blog = req.body;
    let isTitleOrAuthorBlank = new_blog.title === '' || new_blog.author === '';
    let isTitleOrAuthorMissing =
      !('author' in new_blog) || !('title' in new_blog);

    // check if title or author is missing
    if (isTitleOrAuthorBlank || isTitleOrAuthorMissing) {
      res.status(400).json({
        message:
          'Bad Request. Check if the request is missing its value for `author` or `title`',
      });
      return;
    }
    // check if likes property exists
    if (!('likes' in new_blog)) {
      new_blog = { ...new_blog, likes: 0 };
    }

    const data = await BlogModel.create(new_blog);
    const response = {
      success: true,
      newly_added_blog: data,
    };

    res.json(response);
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
});

BlogRouter.put('/:id', async (req, res, next) => {
  await mongoose.connect(URI);
  try {
    const id = req.params.id;
    const updated_info = req.body;

    const response = await BlogModel.findByIdAndUpdate(id, updated_info, {
      new: true,
    });

    if (!response) {
      res.status(400).json({
        message: 'Bad Request. The `id` to be updated does not exist',
      });

      return;
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
});

BlogRouter.delete('/:id', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const id = req.params.id;

    const response = await BlogModel.findByIdAndDelete(id);
    if (!response) {
      res.status(400).json({
        message: 'Bad Request. The `id` to be deleted does not exist',
      });

      return;
    }
    res.json({
      success: true,
      deleted_data: response,
    });
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
});

export { BlogRouter };
