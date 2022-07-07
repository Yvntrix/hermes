import {
  ActionIcon,
  Alert,
  Avatar,
  Collapse,
  Group,
  Menu,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import { auth, firestore } from "../lib/firebase";
import calendar from "dayjs/plugin/calendar";
import { useEffect, useState } from "react";
import { DotsVertical, Trash } from "tabler-icons-react";
import { useHover } from "@mantine/hooks";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL, createdAt, id, deleted } = props.message;
  const message = uid === auth.currentUser?.uid ? "right" : "left";
  let color;
  const [msgDate, setMsgDate] = useState("");
  dayjs.extend(calendar);

  useEffect(() => {
    if (createdAt != null) {
      conditions();
    } else {
      setMsgDate("Just now");
    }
  }, []);
  function conditions() {
    if (dayjs().diff(dayjs.unix(createdAt.seconds), "h") > 48) {
      setMsgDate(dayjs.unix(createdAt.seconds).format("MMMM D, YYYY h:mm A"));
    } else {
      setMsgDate(dayjs.unix(createdAt.seconds).calendar());
    }
  }

  function deleteMe() {
    if (uid == auth.currentUser?.uid) {
      updateDoc(doc(firestore, "messages", id), { deleted: true });
    } else {
      toast.error("This didn't work.");
    }
  }

  if (uid == "4d43TqC5jRMhqOM7hcitTmx4mde2") {
    color = "violet";
  } else {
    if (message == "right") {
      color = "yellow";
    }
    if (message == "left") {
      color = "gray";
    }
  }
  const [opened, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Group
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        position={message}
        spacing="xs"
        align="flex-start"
        noWrap
      >
        <Avatar<"a">
          component="a"
          href={`/user/` + uid}
          src={photoURL}
          radius="xl"
          hidden={message == "right" ? true : false}
        />
        <Stack p={0} spacing={2} sx={{ maxWidth: "85%" }}>
          <Group position={message} spacing={3} align="center">
            {hovered ? (
              <Menu
                position="top"
                placement="center"
                size="xs"
                hidden={message == "left"}
                control={
                  <ActionIcon radius="xl" color="dark">
                    <DotsVertical size={20} />
                  </ActionIcon>
                }
              >
                {
                  <Menu.Item
                    onClick={() => deleteMe()}
                    color="red"
                    icon={<Trash size={14} />}
                  >
                    Delete
                  </Menu.Item>
                }
              </Menu>
            ) : (
              ""
            )}
            <Alert
              color={color}
              radius="lg"
              py="xs"
              variant={deleted == undefined ? "light" : "outline"}
              onClick={() => setOpen((o) => !o)}
            >
              {deleted == undefined ? (
                text
              ) : (
                <Text color={color} size="sm">
                  Message removed
                </Text>
              )}
            </Alert>
            {hovered ? (
              <Menu
                position="top"
                placement="center"
                hidden={message == "right"}
                size="xs"
                control={
                  <ActionIcon radius="xl" color="dark">
                    <DotsVertical size={20} />
                  </ActionIcon>
                }
              >
                {
                  <Menu.Item
                    onClick={() => deleteMe()}
                    color="red"
                    icon={<Trash size={14} />}
                  >
                    Delete
                  </Menu.Item>
                }
              </Menu>
            ) : (
              ""
            )}
          </Group>
          <Collapse in={opened} px="xs">
            {
              <Text size="xs" align={message} color="dimmed">
                {msgDate}
              </Text>
            }
          </Collapse>
        </Stack>
      </Group>
    </>
  );
};

export default ChatMessage;
