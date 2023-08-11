import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text, SimpleGrid, ScrollArea, Container } from '@mantine/core';
import BlogCard from './BlogCard';
import BlogService from '../Services/BlogService';

function BlogList() {
  const JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['qk_blogList'],
    queryFn: async () => {
      const response = await BlogService.getAll(JWT_TOKEN);
      console.log(response);
      return response.data;
    },
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Text fz="2rem" weight="bold" align="center" pb="md">
        Blog list
      </Text>
      <Container h={500} component={ScrollArea}>
        <SimpleGrid cols={3}>
          {data.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default BlogList;
