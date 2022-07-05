import { Alert, Avatar, Collapse, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { auth } from "../lib/firebase";
import calendar from "dayjs/plugin/calendar";
import { useEffect, useState } from "react";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL, createdAt } = props.message;
  const message = uid === auth.currentUser?.uid ? "right" : "left";
  let color;
  const [msgDate, setMsgDate] = useState("");
  dayjs.extend(calendar);

  useEffect(() => {
    if (createdAt != null) {
      conditions();
    }
  }, []);
  function conditions() {
    if (dayjs().diff(dayjs.unix(createdAt.seconds), "h") > 24) {
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
  return (
    <>
      <Group position={message} spacing="xs" align="flex-start" noWrap>
        <Avatar<"a">
          component="a"
          href={`/user/` + uid}
          src={photoURL}
          radius="xl"
          hidden={message == "right" ? true : false}
        />
        <Stack p={0} spacing={2} sx={{ maxWidth: "85%" }}>
          <Group position={message}>
            <Alert
              color={color}
              radius="lg"
              py="xs"
              onClick={() => setOpen((o) => !o)}
            >
              {text}
            </Alert>
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
