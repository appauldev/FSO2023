import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../../app';
import config from '../../../Config/config';
import { UserModel } from '../../../Models/UserModel';
import MOCK_DATA_USERS from './MOCK_DATA_USERS';

const api = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.determineURI());
  await UserModel.deleteMany({});
  await UserModel.create(MOCK_DATA_USERS.user_list);
  await mongoose.disconnect();
});

describe('GET /api/users', () => {
  test('retrieved users must have a `blogs` property', async () => {
    // execute
    const res_user_list = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // verify
    const user_list = res_user_list.body.user_list;
    user_list.forEach((user) => {
      expect(user).toHaveProperty('blogs');
    });
  });
});
