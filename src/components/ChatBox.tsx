import { ActionIcon, Group, TextInput } from "@mantine/core";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Send } from "tabler-icons-react";
import { auth, firestore } from "../lib/firebase";

const ChatBox = () => {
  const [value, setValue] = useState("");
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query as any, { idField: "id" } as any);
  const sendMessage = async () => {
    //@ts-expect-error
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: value,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setValue("");
  };
  return (
    <>
      <Group position="right" sx={{ display: "flex" }} p="sm">
        <TextInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          sx={{ flexGrow: 1 }}
          placeholder="Say Something Nice "
        />
        <ActionIcon
          onClick={() => sendMessage()}
          variant="hover"
          size="lg"
          disabled={value.length < 1 ? true : false}
        >
          <Send />
        </ActionIcon>
      </Group>
    </>
  );
};

export default ChatBox;
