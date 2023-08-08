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

describe('POST /api/users', () => {
  test('a request with valid credentials will be processed', async () => {
    // setup
    const new_user = {
      name: 'Philip Dunphy',
      username: 'philip',
      password: 'philphil',
    };

    // execute
    const response_new_user = await api
      .post('/api/users')
      .send(new_user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const response_updated_user_list = await api.get('/api/users').expect(200);

    // verify
    expect(response_new_user.body.success).toBe(true);
    expect(response_new_user.body.newly_created_user).toMatchObject({
      name: 'Philip Dunphy',
      username: 'philip',
      blogs: [],
    });
    expect(response_updated_user_list.body.user_list.length).toBe(
      MOCK_DATA_USERS.user_list.length + 1
    );
  });

  test('invalid username/password will be rejected', async () => {
    // setup
    const invalid_username = {
      username: 'me',
      name: 'Meow Cat',
      password: 'hellohello',
    };
    const invalid_password = {
      username: 'yours',
      name: 'Truly Yours',
      password: 'he',
    };

    //execute
    const res_invalid_username = await api
      .post('/api/users')
      .send(invalid_username)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const res_invalid_password = await api
      .post('/api/users')
      .send(invalid_password)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    // verify
    expect(res_invalid_username.body.error).toBe(
      'INVALID_REGISTRATION_CREDENTIALS'
    );
    expect(res_invalid_password.body.error).toBe(
      'INVALID_REGISTRATION_CREDENTIALS'
    );
  });

  test('blank username/password will be rejected', async () => {
    // setup
    const invalid_username = {
      username: '',
      name: 'Meow Cat',
      password: 'hellohello',
    };
    const invalid_password = {
      username: 'yours',
      name: 'Truly Yours',
      password: '',
    };

    //execute
    const res_invalid_username = await api
      .post('/api/users')
      .send(invalid_username)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const res_invalid_password = await api
      .post('/api/users')
      .send(invalid_password)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    // verify
    expect(res_invalid_username.body.error).toBe('MISSING_INPUT');
    expect(res_invalid_password.body.error).toBe('MISSING_INPUT');
  });

  test('non-unique username will be rejected', async () => {
    // setup
    const new_user = {
      username: 'unique',
      name: 'Uni Que',
      password: 'uniuni',
    };
    const duplicate_user = {
      username: 'unique',
      name: 'Que Uni',
      password: 'queque',
    };

    //execute
    const res_new_user = await api
      .post('/api/users')
      .send(new_user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const res_duplicate_user = await api
      .post('/api/users')
      .send(duplicate_user)
      .expect(409)
      .expect('Content-Type', /application\/json/);

    // verify
    expect(res_new_user.body.success).toBe(true);
    expect(res_duplicate_user.body.error).toBe('USERNAME_ALREADY_EXISTS');
  });
});
