import mongoose from 'mongoose';
import app from '../../../app';
import supertest from 'supertest';
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

describe('POST /api/blogs', () => {
  test('a blog post item must be saved correctly to the db', async () => {
    // setup
    const new_blog = {
      title: 'Multi-channelled actuating database',
      author: 'Niall Goddert.sf',
      url: 'https://slate.com/nonummy/integer/non/velit/donec/diam/neque.xml',
      likes: 24,
    };

    // execute
    const response = await api
      .post('/api/blogs')
      .send(new_blog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    // console.log(response.body);

    // verify
    // check length
    const updated_blog_list = await api.get('/api/blogs').expect(200);
    expect(updated_blog_list.body.length).toBe(MOCK_DATA.blog_list.length + 1);
    // check if right data was saved
    const id = response.body.newly_added_blog.id;
    const newly_saved_blog = await api.get(`/api/blogs/${id}`);
    expect(newly_saved_blog.body).toMatchObject({ ...new_blog, id });
  });

  test('request without the `likes` property must default to `likes: 0`', async () => {
    // setup
    const req_without_likes = {
      title: 'Face to face intangible support',
      author: 'Gleda Rust',
      url: 'https://ftc.gov/nunc.jpg',
    };

    // execute
    const response = await api
      .post('/api/blogs')
      .send(req_without_likes)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    // console.log(response.body);

    // verify
    // newly created object must have 0 likes
    expect(response.body.newly_added_blog.likes).toBe(0);
  });

  test('should receive error 400 Bad Request when `author` or `title` is missing from request ', async () => {
    // setup
    const req_without_author = {
      title: 'Pre-emptive zero administration access',
      url: 'http://imgur.com/nascetur/ridiculus/mus/etiam.xml',
      likes: 58,
    };

    const req_without_title = {
      author: 'Daniele Harbard',
      url: 'http://zdnet.com/in/tempor/turpis/nec/euismod.jsp',
      likes: 36,
    };

    // execute
    const response_without_author = await api
      .post('/api/blogs')
      .send(req_without_author)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const response_without_title = await api
      .post('/api/blogs')
      .send(req_without_title)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    // verify
    expect(response_without_author.body.error).toBe('MISSING_INPUT');
    expect(response_without_title.body.error).toBe('MISSING_INPUT');
  });

  test('should receive error 400 Bad Request when `author` or `title` has blank values', async () => {
    // setup
    const req_with_blank_author = {
      title: 'Devolved next generation knowledge base',
      author: '',
      url: 'https://salon.com/vel/accumsan/tellus/nisi/eu.jpg',
      likes: 5,
    };
    const req_with_blank_title = {
      title: '',
      author: 'Garrick Limpenny',
      url: 'https://vistaprint.com/ipsum/aliquam.jpg',
      likes: 61,
    };

    // execute
    const response_with_blank_author = await api
      .post('/api/blogs')
      .send(req_with_blank_author)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const response_with_blank_title = await api
      .post('/api/blogs')
      .send(req_with_blank_title)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response_with_blank_author.body.error).toBe('MISSING_INPUT');
    expect(response_with_blank_title.body.error).toBe('MISSING_INPUT');
  });

  test('a newly created blog must have a `user` property', async () => {
    const new_blog = {
      title: 'Multi-database',
      author: 'Nialle Goddert.sf',
      url: 'https://slate.com/nonummy/integer/non/velit/donec/diam/neque.xml',
      likes: 2,
    };

    // execute
    const res_new_blog_with_user = await api
      .post('/api/blogs')
      .send(new_blog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // verify
    const newly_added_blog = res_new_blog_with_user.body.newly_added_blog;
    expect(newly_added_blog).toHaveProperty('user');
  });
});
