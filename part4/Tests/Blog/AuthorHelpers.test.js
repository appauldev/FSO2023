import AuthorHelpers from './AuthorHelpers.js';
import ArrayUtils from '../Utils/ArrayUtils.js';
import mockData from './mockData.js';

describe('Find the author(s) with the most writings', () => {
  test('should find a single author with the most number of blogs', () => {
    const author = AuthorHelpers.getAuthorWithMostWrittenBlogs(
      mockData.blog_list2
    );

    expect(author).toEqual({
      number_of_blogs: 3,
      authors: ['Robert C. Martin'],
    });
  });

  test('should return multiple authors who wrote the most number of blogs', () => {
    const authors = AuthorHelpers.getAuthorWithMostWrittenBlogs([
      mockData.blog_list2[1],
      mockData.blog_list2[0],
      mockData.blog_list2[1],
      mockData.blog_list2[1],
      mockData.blog_list2[3],
      mockData.blog_list[4],
      mockData.blog_list2[3],
      mockData.blog_list2[0],
      mockData.blog_list2[3],
    ]);

    expect(authors).toEqual({
      number_of_blogs: 3,
      authors: ['Edsger W. Dijkstra', 'Robert C. Martin'],
    });
  });

  test('invalid argument should throw an error', () => {
    ArrayUtils.InvalidArrayInputTest(
      AuthorHelpers.getAuthorWithMostWrittenBlogs
    );
  });
});
