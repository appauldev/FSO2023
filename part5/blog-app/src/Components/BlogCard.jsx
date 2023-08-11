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
import { notifications } from '@mantine/notifications';
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
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [lineClamp] = useState(1);
  const current_user = window.localStorage.getItem('user_id');
  const JWT_TOKEN = window.localStorage.getItem('JWT_TOKEN');

  async function updateLike() {
    const new_likes = isLiked ? likesCount - 1 : likesCount + 1;
    try {
      const response = await BlogService.updateOne(JWT_TOKEN, {
        id,
        likes: new_likes,
      });
      console.log(response);
      const newIsLiked = isLiked ? false : true;
      setIsLiked(newIsLiked);
      setLikesCount(new_likes);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBlog() {
    try {
      setIsDeleting(true);
      const response = await BlogService.deleteOne(JWT_TOKEN, id);
      console.log(response);
      if (response.data.success) {
        // close popover and remove blog from list
        setPopoverOpened(false);
        setTimeout(() => {
          setIsDeleted(true);
        }, 500);
        notifications.show({
          title: 'Blog deleted!',
          message: `${response.data.deleted_data.title} has been deleted`,
          color: 'red',
          icon: <IconTrash />,
        });
      }
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
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
      display={isDeleted ? 'none' : 'block'}
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
                <Popover
                  withArrow
                  withinPortal
                  position="left-end"
                  opened={popoverOpened}
                  onChange={setPopoverOpened}
                >
                  <Popover.Target>
                    <ActionIcon
                      color="gray"
                      onClick={() => {
                        setPopoverOpened((isOpen) => !isOpen);
                      }}
                    >
                      <IconTrash
                        size="1.2rem"
                        color={theme.colors.gray[6]}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Stack>
                      <Text>
                        Do you want to delete this blog? <br />
                        This action is not reversible.
                      </Text>
                      <Group>
                        <Button
                          variant="outline"
                          color="gray"
                          loading={isDeleting}
                          onClick={() => {
                            setPopoverOpened((isOpen) => !isOpen);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="filled"
                          color="red"
                          loading={isDeleting}
                          onClick={() => {
                            deleteBlog();
                          }}
                        >
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
