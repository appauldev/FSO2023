import { useEffect, useState } from 'react';
import { Text, SimpleGrid, ScrollArea, Container } from '@mantine/core';
import BlogCard from './BlogCard';
import BlogService from '../Services/BlogService';

function BlogList() {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchBlogList() {
      try {
        const JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
        const response = await BlogService.getAll(JWT_TOKEN, controller);
        if (response) {
          setBlogList(response.data);
        }
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.log('Non-abort error');
          console.log(error);
        }
      }
    }
    fetchBlogList();
    return () => controller.abort();
  }, []);

  console.log(blogList);
  return (
    <>
      <Text fz="2rem" weight="bold" align="center" pb="md">
        Blog list
      </Text>
      <Container h={500} component={ScrollArea}>
        <SimpleGrid cols={3}>
          {blogList
            ? blogList.map((blog) => {
                return <BlogCard key={blog.id} {...blog} />;
              })
            : null}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default BlogList;
