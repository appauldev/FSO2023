import dummyFunctions from './dummyFunctions.js';

test('dummy1 returns 1', () => {
  const blog_list = [];

  const result = dummyFunctions.dummy1(blog_list);

  expect(result).toBe(1);
});
