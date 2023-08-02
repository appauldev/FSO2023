import ArrayUtils from '../Utils/ArrayUtils';
import BlogHelpers from './BlogHelpers';
import mockData from './mockData.js';

describe('Count Likes', () => {
  test('countTotalBlogLikes() should show the total likes of all blogs ', () => {
    const total_likes = BlogHelpers.countTotalBlogLikes(mockData.blog_list);

    expect(total_likes).toBe(364);
  });

  test('empty list should show 0 likes', () => {
    const total_likes = BlogHelpers.countTotalBlogLikes([]);
    expect(total_likes).toBe(0);
  });

  test('a list with one blog should show the likes for that blog', () => {
    const randNumber = Math.floor(Math.random() * mockData.blog_list.length);
    // console.log(randNumber);
    const total_likes = BlogHelpers.countTotalBlogLikes([
      mockData.blog_list[randNumber],
    ]);
    expect(total_likes).toBe(mockData.blog_list[randNumber].likes);
  });

  test('invalid argument should throw an error', () => {
    ArrayUtils.InvalidArrayInputTest(BlogHelpers.countTotalBlogLikes);
  });
});

describe('Most favorite blogs. Expects an array that contains the most favorite blog(s)', () => {
  test('should get the most favorite blogs', () => {
    const most_liked_blog = {
      title: 'Ergonomic discrete matrices',
      author: 'Cooper Francescozzi',
      url: '/vel/augue/vestibulum/rutrum/rutrum.js',
      likes: 90,
    };
    const most_favorite_blogs = BlogHelpers.getMostFavoriteBlogs(
      mockData.blog_list
    );

    expect(most_favorite_blogs.length).toBe(1);
    expect(most_favorite_blogs[0]).toEqual(most_liked_blog);
  });

  test('should return multiple blogs if they have the same likes', () => {
    const most_favorite_blogs = BlogHelpers.getMostFavoriteBlogs([
      mockData.blog_list[3],
      mockData.blog_list[3],
      mockData.blog_list[3],
      mockData.blog_list[5],
      mockData.blog_list[1],
      mockData.blog_list[3],
    ]);

    expect(most_favorite_blogs.length).toBe(4);
    expect(most_favorite_blogs[1]).toEqual({
      title: 'Optional responsive leverage',
      author: 'Terrye Dewire',
      url: '/integer/non/velit.js',
      likes: 78,
    });
  });

  test('invalid argument should throw an error', () => {
    ArrayUtils.InvalidArrayInputTest(BlogHelpers.getMostFavoriteBlogs);
  });
});
