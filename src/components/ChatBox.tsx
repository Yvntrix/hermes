import { ActionIcon, Group, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MoodHappy, Send } from "tabler-icons-react";
import { auth, firestore } from "../lib/firebase";

interface prop {
  fn: () => void;
}
const ChatBox = ({ fn }: prop) => {
  const [value, setValue] = useState("");
  const messagesRef = firestore.collection("messages");
  const user = auth.currentUser;
  let mess = "";
  const sendMessage = async () => {
    if (user) {
      fn();
      mess = value;
      setValue("");
      const { uid, photoURL } = user;
      await messagesRef.add({
        text: mess,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
    }
  };
  return (
    <>
      <Group position="right" sx={{ display: "flex", height: "8vh" }} p="sm">
        <TextInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          sx={{ flexGrow: 1 }}
          placeholder="Say Something Nice "
          rightSection={
            <ActionIcon>
              <MoodHappy />
            </ActionIcon>
          }
          onKeyDown={
            !/\S/.test(value)
              ? undefined
              : getHotkeyHandler([["Enter", sendMessage]])
          }
        />
        <ActionIcon
          onClick={() => sendMessage()}
          variant="hover"
          size="lg"
          disabled={!/\S/.test(value) ? true : value.length < 2 ? true : false}
        >
          <Send />
        </ActionIcon>
      </Group>
    </>
  );
};

export default ChatBox;
