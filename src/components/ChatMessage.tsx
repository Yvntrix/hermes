import { Alert, Avatar, Badge, Group, Paper } from "@mantine/core";
import { auth } from "../lib/firebase";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL } = props.message;
  // @ts-expect-error
  const message = uid === auth.currentUser.uid ? "right" : "left";
  return (
    <>
      <Group position={message} spacing="xs">
        {message == "right" ? (
          <>
            <Alert color={message == "right" ? "indigo" : "gray"} radius="xl">
              {text}
            </Alert>
            <Avatar src={photoURL} radius="xl" />
          </>
        ) : (
          <>
            <Avatar src={photoURL} radius="xl" />
            <Alert color={message == "left" ? "gray" : "indigo"} radius="xl">
              {text}
            </Alert>
          </>
        )}
      </Group>
    </>
  );
};

export default ChatMessage;
