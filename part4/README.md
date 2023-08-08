# Part 4: Testing Express servers, user administration

## Notes:

- All test files are under the folder `Tests`. Specifcally, all tests that involves API testing are under `Tests/api.tests`.
- The test files are grouped according to their endpoint and HTTP request method (e.g., tests for `GET /api/blogs` are under `Tests/api.tests/blogs/blogs.get.tests.js`)
- For mocking the database, I have used a local setup of MongoDB running on docker using the [official MongoDB docker image](https://hub.docker.com/_/mongo/)
- All configs are found in `Config/config.js`. Please create and save the corresponding config in `.env.local` with the corresponding environment variable name found in `config.js`.
- The file `.env.local` must be saved in the root folder. Furthermore, it should contain the following environment variables:

```bash
MONGODB_PART4_CLUSTER0_URI=replace_this_value
TEST_MONGODB_URI=replace_this_value
SUPER_ULTRA_SECRET=replace_this_value
SUPER_ULTRA_SECRET_HASHED=replace_this_value
SAMPLE_BEARER_AUTH=replace_this_value
```

**Note**: see `getJWTSecret()` in `Config/config.js` about `SUPER_ULTRA_SECRET` and `SUPER_ULTRA_SECRET_HASHED`
