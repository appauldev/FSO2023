import { Button, Paper, Text, Flex, Group } from '@mantine/core';
import { useAtom } from 'jotai';
import LoginStore from '../Stores/LoginStore';

function ProfileCard() {
  const username = window.localStorage.getItem('username');
  const user_id = window.localStorage.getItem('user_id');
  const name = window.localStorage.getItem('name');

  const [, setIsLoggedIn] = useAtom(LoginStore.loginStatus);

  function logout() {
    setIsLoggedIn(false);
    window.localStorage.clear();
    console.log('LOG OUT');
  }
  return (
    <Paper p="1rem" radius="md" w={400} withBorder shadow="sm">
      <Flex direction="column" align="center" rowGap=".5rem" mb={12}>
        <Text fz="2rem" weight={500}>{`${name}`}</Text>
        <Group>
          <Text ta="center" c="dimmed" fz="md">
            {`@${username}`} • {user_id}
          </Text>
        </Group>
        <Button
          mt={16}
          onClick={() => {
            logout();
          }}
        >
          Log out
        </Button>
      </Flex>
    </Paper>
  );
}

export default ProfileCard;
