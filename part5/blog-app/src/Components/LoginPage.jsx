import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  rem,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { loginSchema } from '../Validations/LoginValidation';
import LoginService from '../Services/LoginService';
import LoginStore from '../Stores/LoginStore';
export function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsLoggedIn] = useAtom(LoginStore.loginStatus);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Inter, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Log in
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="xs" p={30} mt={30} w={400} radius="sm">
        <form
          onSubmit={form.onSubmit(async (values) => {
            setIsSubmitting(true);
            console.log(values);
            const response = await LoginService.login(
              values.username,
              values.password
            );
            if (response.status === 401) {
              setIsSubmitting(false);
              console.log('WRONG CREDENTIALS');
              form.setErrors({
                username: 'Wrong credentials',
                password: 'Wrong credentials',
              });
            } else if (response.status === 200) {
              console.log('LOGIN SUCCESSFUL');
              LoginService.saveLoginToLocalStorage(response);
              setIsLoggedIn(true);
            }
          })}
        >
          <TextInput
            label="Username"
            placeholder="Your username"
            required
            disabled={isSubmitting}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            disabled={isSubmitting}
            mt="md"
            {...form.getInputProps('password')}
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
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
