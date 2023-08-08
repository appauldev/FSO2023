import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { BlogModel } from '../Models/BlogModel.js';
import config from '../Config/config.js';
// import { getRandomUser } from '../Utils/randomUser.js';
// import BlogRouterHelper from '../Utils/BlogRouterHelper.js';
import { UserModel } from '../Models/UserModel.js';

const URI = config.determineURI();

const BlogRouter = express.Router();

BlogRouter.use(express.json());

BlogRouter.get('/', async (req, res, next) => {
  try {
    await mongoose.connect(URI);
    const data = await BlogModel.find({}).populate('user', {
      username: 1,
      name: 1,
    });
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
    // verify user
    const decoded_token = jwt.verify(req.token, config.getJWTSecret());
    console.log(decoded_token);
    if (!decoded_token.id) {
      res.status(400).json({
        error: 'INVALID_TOKEN',
        message: 'You must be logged in to make this request.',
      });
    }

    // valid token
    await mongoose.connect(URI);
    const user = await UserModel.findById(req.user.id);

    let new_blog = req.body;

    // validate
    let isTitleOrAuthorBlank = new_blog.title === '' || new_blog.author === '';
    let isTitleOrAuthorMissing =
      !('author' in new_blog) || !('title' in new_blog);
    // check if title or author is missing
    if (isTitleOrAuthorBlank || isTitleOrAuthorMissing) {
      res.status(400).json({
        error: 'MISSING_INPUT',
        message:
          'Check if the request is missing its value for `author` or `title`',
      });
      return;
    }
    // check if likes property exists
    if (!('likes' in new_blog)) {
      new_blog = { ...new_blog, likes: 0 };
    }

    // // get random user
    // const rand_user = await getRandomUser();
    // new_blog = { ...new_blog, user: rand_user._id };

    // user of the note must be the one in the decoded token
    new_blog = { ...new_blog, user: user._id };
    // save to db
    const data = await BlogModel.create(new_blog);

    // rand_user.blogs = rand_user.blogs.concat(data._id);
    // await rand_user.save();
    user.blogs = user.blogs.concat(data._id);
    await user.save();

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
    // verify JWT
    const decoded_token = jwt.verify(req.token, config.getJWTSecret());
    if (!decoded_token.id) {
      res.status(400).json({
        error: 'INVALID_TOKEN',
        message: 'You must be logged in to make this request.',
      });
    }

    // valid JWT
    // verify if user is allowed to delete the blog
    const user = req.user;
    const blog_id = req.params.id;

    await mongoose.connect(URI);
    const response = await BlogModel.findOneAndDelete({
      _id: blog_id,
      user: user.id,
    });

    if (!response) {
      res.status(400).json({
        error: 'NULL_RESPONSE',
        message:
          'You are not allowed to delete the resource or the resource may have already been deleted',
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
