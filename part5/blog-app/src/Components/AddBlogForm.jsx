import { useState } from 'react';
import { useAtom } from 'jotai';
import { TextInput, Paper, Title, Container, Button, rem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { newBlogSchema } from '../Validations/AddBlogFormValidation';
import BlogService from '../Services/BlogService';

function AddBlogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      title: '',
      author: '',
      url: '',
    },
    validate: zodResolver(newBlogSchema),
  });

  return (
    <Container size={600} my={40}>
      <Paper withBorder shadow="xs" p={30} mt={30} w="100%" radius="sm">
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Inter, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Add a new blog
        </Title>
        <form
          onSubmit={form.onSubmit(async (new_blog) => {
            setIsSubmitting(true);
            const JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
            console.log(new_blog);
            const response = await BlogService.addOne(JWT_TOKEN, new_blog);
            console.log(response);
            if (response.status === 401) {
              console.log('UNAUTHORIZED REQUEST');
              form.setErrors({
                title:
                  'It seems like you are not logged in. Please login again to create a new blog.',
              });
            } else if (response.status === 400) {
              console.log('BAD_REQUEST');
              form.setErrors({
                title: 'You must enter a blog title!',
                author: 'You must enter a blog author',
              });
            } else if (response.status === 200) {
              console.log('BLOG CREATED!');
              form.reset();
              setIsSubmitting(false);
              // invalidate blog list
              queryClient.invalidateQueries(['qk_blogList']);
              // show notif
              notifications.show({
                title: 'Blog created!',
                message: `${new_blog.title} has been added`,
                color: 'green',
                icon: <IconCircleCheckFilled />,
              });
            } else {
              console.log(response);
              form.setErrors({
                title:
                  'Something is wrong on the server. Please check the logs',
              });
            }
          })}
        >
          <TextInput
            label="Blog title"
            placeholder="The blog title"
            required
            disabled={isSubmitting}
            {...form.getInputProps('title')}
          />
          <TextInput
            label="Author"
            placeholder="Blog author"
            required
            disabled={isSubmitting}
            mt="md"
            {...form.getInputProps('author')}
          />
          <TextInput
            label="URL"
            placeholder="Blog URL"
            required
            disabled={isSubmitting}
            mt="md"
            {...form.getInputProps('url')}
          />

          <Button
            type="submit"
            fullWidth
            mt="xl"
            styles={() => ({
              root: {
                height: rem(42),
              },
            })}
            loading={isSubmitting}
            loaderPosition="center"
          >
            Add new blog
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddBlogForm;
