import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  rem,
  Button,
  Stack,
  Popover,
} from '@mantine/core';
import { IconHeart, IconHeartFilled, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import BlogService from '../Services/BlogService';

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
function BlogCard({ id, title, author, url, likes, user }) {
  const { classes, theme } = useStyles();
  const [buttonLabel, setButtonLabel] = useState('View details');
  const [hideDetails, setHideDetails] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [lineClamp] = useState(1);
  const current_user = window.localStorage.getItem('user_id');

  async function updateLike() {
    const JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');
    if (isLiked) {
      // undo the like
      const new_likes = likesCount - 1;
      const response = await BlogService.updateOne(JWT_TOKEN, {
        id,
        likes: new_likes,
      });
      console.log(response);
      setIsLiked(false);
      setLikesCount(new_likes);
    } else {
      const new_likes = likesCount + 1;
      const response = await BlogService.updateOne(JWT_TOKEN, {
        id,
        likes: new_likes,
      });
      console.log(response);
      setIsLiked(true);
      setLikesCount(new_likes);
    }
  }

  return (
    <Card
      withBorder
      shadow="sm"
      w={280}
      padding="lg"
      radius="md"
      className={classes.card}
    >
      <Card.Section mb="sm">
        <Image src={url} alt={title} height={180} />
      </Card.Section>

      <Stack>
        <Text
          fz="xl"
          fw={700}
          className={classes.title}
          mt="xs"
          lineClamp={hideDetails ? lineClamp : 0}
        >
          {title}
        </Text>
        <Button
          onClick={() => {
            if (hideDetails) {
              setHideDetails(false);
              setButtonLabel('Hide details');
            } else {
              setHideDetails(true);
              setButtonLabel('View details');
            }
          }}
        >
          {buttonLabel}
        </Button>
      </Stack>

      <div
        style={{
          display: hideDetails ? 'none' : 'block',
        }}
      >
        {/* <Badge>{category}</Badge> */}

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
          <Text fz="md" c="blue">
            Added by: {user.name} (@{user.username})
          </Text>
          <Group position="apart" pt="1rem">
            <Text fz="xs" c="dimmed">
              {`${likesCount} people have liked this`}
            </Text>
            <Group spacing={0}>
              <ActionIcon
                color="red"
                onClick={() => {
                  updateLike();
                }}
              >
                {isLiked ? (
                  <IconHeartFilled
                    size="1.2rem"
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                ) : (
                  <IconHeart size="1.2rem" color={theme.colors.red[6]} />
                )}
              </ActionIcon>

              {current_user === user.id ? (
                <Popover withArrow withBorder withinPortal position="left-end">
                  <Popover.Target>
                    <ActionIcon color="gray">
                      <IconTrash
                        size="1.2rem"
                        color={theme.colors.gray[6]}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Stack>
                      <Text>Do you want to delete this blog?</Text>
                      <Group>
                        <Button variant="outline" color="gray">
                          Cancel
                        </Button>
                        <Button variant="filled" color="red">
                          Delete blog
                        </Button>
                      </Group>
                    </Stack>
                  </Popover.Dropdown>
                </Popover>
              ) : null}
            </Group>
          </Group>
        </Card.Section>
      </div>
    </Card>
  );
}
export default BlogCard;
