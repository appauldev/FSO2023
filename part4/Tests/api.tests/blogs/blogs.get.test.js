import app from '../../../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../../Config/config';
import { BlogModel } from '../../../Models/BlogModel';
import MOCK_DATA from './MOCK_DATA';

const api = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.determineURI());
  await BlogModel.deleteMany({});
  await BlogModel.create(MOCK_DATA.blog_list);
  await mongoose.disconnect();
});

// afterAll(async () => {
//   await mongoose.disconnect();
// });

describe('GET api/blogs', () => {
  test('should get all the list of blog posts', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(10);
  });

  test('all blog post must have an id', async () => {
    const response = await api.get('/api/blogs').expect(200);

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});
