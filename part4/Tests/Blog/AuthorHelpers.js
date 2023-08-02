function getAuthorWithMostWrittenBlogs(blog_list) {
  if (!Array.isArray(blog_list)) {
    throw new Error('Not an array.');
  }

  const author_map = new Map();
  let highest_blog_count = Number.MIN_SAFE_INTEGER;
  let most_written_blogs = {
    number_of_blogs: 0,
    authors: [],
  };
  // populate the author map where we track the number of written articles
  blog_list.forEach((blog) => {
    const { author } = blog;
    if (author_map.has(author)) {
      const current_val = author_map.get(author);
      author_map.set(author, current_val + 1);
    } else {
      author_map.set(author, 1);
    }
  });

  // determine who wrote the most number of blogs
  author_map.forEach((blog_count, author) => {
    if (blog_count > highest_blog_count) {
      highest_blog_count = blog_count;
      most_written_blogs = {
        number_of_blogs: highest_blog_count,
        authors: [author],
      };
      return;
    }
    if (blog_count === highest_blog_count) {
      most_written_blogs.authors.push(author);
      return;
    }
  });

  console.log(most_written_blogs);
  return most_written_blogs;
}

export default {
  getAuthorWithMostWrittenBlogs,
};
