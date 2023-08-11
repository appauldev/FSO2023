import { Text, Tabs, Group, Container } from '@mantine/core';
import { IconUserCircle, IconBook, IconCirclePlus } from '@tabler/icons-react';
import ProfileCard from './ProfileCard';

import BlogList from './BlogList';
import AddBlogForm from './AddBlogForm';

function Main() {
  return (
    <Container mt="2rem">
      <Tabs color="dark" variant="pills" radius="xl" defaultValue="blog_list">
        <Tabs.List grow>
          <Tabs.Tab value="profile" icon={<IconUserCircle size="1rem" />}>
            <Text fz={16}>Profile</Text>
          </Tabs.Tab>
          <Tabs.Tab value="add_new_blog" icon={<IconCirclePlus size="1rem" />}>
            <Text fz={16}>Add new blog</Text>
          </Tabs.Tab>
          <Tabs.Tab value="blog_list" icon={<IconBook size="1rem" />}>
            <Text fz={16}>Blog list</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" p="xl">
          <Group position="center">
            <ProfileCard />
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="add_new_blog" p="xl">
          <AddBlogForm />
        </Tabs.Panel>

        <Tabs.Panel value="blog_list" p="xl">
          <BlogList />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default Main;
