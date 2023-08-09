import { Paper, Text } from '@mantine/core';

function BlogCard() {
  return (
    <Paper p="1rem">
      <Text fz="2rem" weight="bold">
        Blog Title
      </Text>
      <Text>Blog URL</Text>
    </Paper>
  );
}

export default BlogCard;
