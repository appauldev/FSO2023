import { z } from 'zod';

export const newBlogSchema = z.object({
  title: z.string().nonempty().min(1, 'You must enter a blog title'),
  author: z.string().nonempty().min(1, 'You must enter the author of the blog'),
  url: z.string().nonempty().url('You must enter a valid URL'),
});
