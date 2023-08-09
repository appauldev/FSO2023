import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Your usernamme must be at least 3 characters.' }),
  password: z.string().nonempty(),
});
