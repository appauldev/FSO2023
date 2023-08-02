// import _array from 'lodash/array';
// import _object from 'lodash/object';

function countTotalBlogLikes(blog_list) {
  if (!Array.isArray(blog_list)) {
    throw new Error('Not an array.');
  }
  function reducer(currentTotalLikes, blog_item) {
    return currentTotalLikes + blog_item.likes;
  }
  const totalBlogLikes = blog_list.reduce(reducer, 0);

  return totalBlogLikes;
}

function getMostFavoriteBlogs(blog_list) {
  if (!Array.isArray(blog_list)) {
    throw new Error('Not an array.');
  }

  let highest_likes = Number.MIN_SAFE_INTEGER;
  let most_favorite_blogs = [];
  for (let index = 0; index < blog_list.length; index++) {
    const current_likes = blog_list[index].likes;

    if (current_likes > highest_likes) {
      highest_likes = current_likes;
      most_favorite_blogs = [];
      most_favorite_blogs.push(index);
      continue;
    }

    if (current_likes === highest_likes) {
      most_favorite_blogs.push(index);
      continue;
    }
  }

  const final_list = most_favorite_blogs.map((index) => {
    return blog_list[index];
  });

  // console.log(final_list);
  return final_list;
}

export default {
  countTotalBlogLikes,
  getMostFavoriteBlogs,
};
