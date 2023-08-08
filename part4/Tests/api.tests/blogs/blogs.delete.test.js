import mongoose from 'mongoose';
import app from '../../../app';
import supertest from 'supertest';
import config from '../../../Config/config';
import { BlogModel } from '../../../Models/BlogModel';

const api = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.determineURI());
  await BlogModel.deleteMany({});
  // const res = await BlogModel.create(MOCK_DATA.blog_list);
  // blog_to_delete = res[0];
  // console.log(blog_to_delete);
  await mongoose.disconnect();
});

describe('DELETE /api/blogs/:id', () => {
  test('a blog can only be deleted by the user who created it', async () => {
    // setup
    const new_blog = {
      title: 'To be deleted',
      author: 'Niall Goddert.sf',
      url: 'https://slate.com/nonummy/integer/non/velit/donec/diam/neque.xml',
      likes: 24,
    };
    // add the new blog to be deleted later
    // The username of the jwt is "jay"
    const res_new_blog = await api
      .post('/api/blogs')
      .send(new_blog)
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res_new_blog.body.success).toBe(true);
    const newly_added_blog = res_new_blog.body.newly_added_blog;
    // execute
    const response_valid_id = await api
      .delete(`/api/blogs/${newly_added_blog.id}`)
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const response_updated_blog_list = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .expect(200);
    // verify
    expect(response_valid_id.body.success).toBe(true);
    expect(response_valid_id.body.deleted_data).toEqual({
      title: newly_added_blog.title,
      author: newly_added_blog.author,
      url: newly_added_blog.url,
      likes: newly_added_blog.likes,
      id: newly_added_blog.id,
      user: newly_added_blog.user,
    });
    expect(response_updated_blog_list.body.length).toBe(0);
  });
  test('a delete request fails when `id` is malformed', async () => {
    // setup
    const malformed_id = 'invalid_id';

    // execute
    const response_malformed_id = await api
      .delete(`/api/blogs/${malformed_id}`)
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .expect(400);

    // verify
    expect(response_malformed_id.body.type).toBe('CastError');
  });
  test('a delete request fails when `id` is valid but does not exist', async () => {
    // assume that the valid id below will not be generated by mongodb
    const id_that_does_not_exist = '64cf48e8e8c2a37ae2d55fc5';

    // execute
    const response = await api
      .delete(`/api/blogs/${id_that_does_not_exist}`)
      .set('Authorization', `Bearer ${config.getSampleBearerToken()}`)
      .expect(400);

    // verify
    expect(response.body.error).toBe('NULL_RESPONSE');
  });
});
