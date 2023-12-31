import mongoose from 'mongoose';
import app from '../../../app';
import supertest from 'supertest';
import config from '../../../Config/config';
import { BlogModel } from '../../../Models/BlogModel';
import MOCK_DATA from './MOCK_DATA';

const api = supertest(app);
let blog_to_update = {};

beforeAll(async () => {
  await mongoose.connect(config.determineURI());
  await BlogModel.deleteMany({});
  const res = await BlogModel.create(MOCK_DATA.blog_list);
  blog_to_update = res[2];
  await mongoose.disconnect();
});

describe('PUT /api/blogs/:id', () => {
  test('a PUT request should correctly update the corresponding item in the db', async () => {
    // setup
    const id = blog_to_update._id.toString();
    const update_request_info = {
      title: 'The new title',
      likes: 120,
    };

    // execute
    const response = await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .send(update_request_info)
      .expect(200);

    // verify
    expect(response.body).toEqual({
      ...update_request_info,
      author: blog_to_update.author,
      id: blog_to_update.id,
      url: blog_to_update.url,
    });
  });

  test('a PUT request fails when `id` is malformed', async () => {
    // setup
    const malformed_id = 'invalid_id';

    // execute
    const response_malformed_id = await api
      .put(`/api/blogs/${malformed_id}`)
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .expect(400);

    // verify
    expect(response_malformed_id.body.type).toBe('CastError');
  });
  test('a PUT request fails when `id` is valid but does not exist', async () => {
    // assume that the valid id below will not be generated by mongodb
    const id_that_does_not_exist = '64cf48e8e8c2a37ae2d55fc5';

    // execute
    const response = await api
      .put(`/api/blogs/${id_that_does_not_exist}`)
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .expect(400);

    // verify
    expect(response.body.message).toBe(
      'Bad Request. The `id` to be updated does not exist'
    );
  });
});
