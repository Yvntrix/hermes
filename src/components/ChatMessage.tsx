import {
  ActionIcon,
  Alert,
  Avatar,
  Collapse,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import { auth } from "../lib/firebase";
import calendar from "dayjs/plugin/calendar";
import { useEffect, useState } from "react";
import { DotsVertical } from "tabler-icons-react";
import { useHover } from "@mantine/hooks";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL, createdAt } = props.message;
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
    if (dayjs().diff(dayjs.unix(createdAt.seconds), "h") > 36) {
      setMsgDate(dayjs.unix(createdAt.seconds).format("MMMM D, YYYY h:mm A"));
    } else {
      setMsgDate(dayjs.unix(createdAt.seconds).calendar());
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
  const { hovered, ref } = useHover();
  return (
    <>
      <Group
        ref={ref}
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
              <ActionIcon radius="xl" color="dark" hidden={message == "left"}>
                <Tooltip label="More" withArrow position="top">
                  <DotsVertical size={16} />
                </Tooltip>
              </ActionIcon>
            ) : (
              ""
            )}
            <Alert
              color={color}
              radius="lg"
              py="xs"
              onClick={() => setOpen((o) => !o)}
            >
              {text}
            </Alert>
            {hovered ? (
              <ActionIcon radius="xl" color="dark" hidden={message == "right"}>
                <Tooltip label="More" withArrow position="top">
                  <DotsVertical size={16} />
                </Tooltip>
              </ActionIcon>
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
