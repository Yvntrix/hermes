import { Alert, Avatar, Badge, Group, Paper } from "@mantine/core";
import { auth } from "../lib/firebase";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL } = props.message;
  // @ts-expect-error
  const message = uid === auth.currentUser.uid ? "right" : "left";
  let color;
  if (uid == "4d43TqC5jRMhqOM7hcitTmx4mde2") {
    color = "yellow";
  } else {
    if (message == "right") {
      color = "indigo";
    }
    if (message == "left") {
      color = "gray";
    }
  }

  return (
    <>
      <Group position={message} spacing="xs">
        {message == "right" ? (
          <>
            <Alert color={color} radius="xl">
              {text}
            </Alert>
            <Avatar src={photoURL} radius="xl" />
          </>
        ) : (
          <>
            <Avatar src={photoURL} radius="xl" />
            <Alert color={color} radius="xl">
              {text}
            </Alert>
          </>
        )}
      </Group>
    </>
  );
};

export default ChatMessage;
