import { Alert, Avatar, Group } from "@mantine/core";
import { auth } from "../lib/firebase";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL } = props.message;
  const message = uid === auth.currentUser?.uid ? "right" : "left";
  let color;
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
        <Alert color={color} radius="lg" py={5} sx={{ maxWidth: "85%" }}>
          {text}
        </Alert>
      </Group>
    </>
  );
};

export default ChatMessage;
