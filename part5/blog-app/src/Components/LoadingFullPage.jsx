import { Container, Stack, Title } from '@mantine/core';

function LoadingFullPage() {
  return (
    <Container h="100%">
      <Stack h="100%" justify="center">
        <Title align="center">Loading App</Title>
      </Stack>
    </Container>
  );
}

export default LoadingFullPage;
