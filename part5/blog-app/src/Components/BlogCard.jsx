import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  rem,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

// eslint-disable-next-line react/prop-types
function BlogCard({ id, title, author, url, likes }) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder w={300} padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image src={url} alt={title} height={180} />
      </Card.Section>

      {/* <Badge>{category}</Badge> */}

      <Text fw={700} className={classes.title} mt="xs" lineClamp={2}>
        {title}
      </Text>

      <Group mt="lg">
        <Avatar src={''} radius="sm" />
        <div>
          <Text fw={500}>{author}</Text>
          <Text fz="xs" c="dimmed">
            {id}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text fz="xs" c="dimmed">
            {`${likes} people have liked this`}
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart
                size="1.2rem"
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
export default BlogCard;
