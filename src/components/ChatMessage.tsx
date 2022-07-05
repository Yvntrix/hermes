import { Alert, Avatar, Group } from "@mantine/core";
import { auth } from "../lib/firebase";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL } = props.message;
  const message = uid === auth.currentUser?.uid ? "right" : "left";
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
        <Avatar<"a">
          component="a"
          href={`/user/` + uid}
          src={photoURL}
          radius="xl"
          hidden={message == "right" ? true : false}
        />
        <Alert color={color} radius="lg" p="xs" sx={{ maxWidth: "70%" }}>
          {text}
        </Alert>
      </Group>
    </>
  );
};

export default ChatMessage;
