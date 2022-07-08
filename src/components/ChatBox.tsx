import { ActionIcon, Group, Stack, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { MoodHappy, Send } from "tabler-icons-react";
import { auth, firestore } from "../lib/firebase";

const ChatBox = (props: any) => {
  const [value, setValue] = useState("");
  const messagesRef = firestore.collection("messages");
  const user = auth.currentUser;
  let mess = "";
  const sendMessage = async () => {
    if (user) {
      if (value.length > 100) {
        toast.error("Must not exceed 100 characters");
        setValue("");
      } else {
        props.fn();
        mess = value;
        setValue("");
        const { uid, photoURL } = user;
        if (props.id == "") {
          await messagesRef.add({
            text: mess,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
          });
        } else {
          await messagesRef.add({
            text: mess,
            createdAt: serverTimestamp(),
            repliedTo: props.id,
            ruid: props.ruid.senderUid,
            rtext: props.ruid.msgText,
            uid,
            photoURL,
          });
        }
      }
    }
  };

  return (
    <>
      <Stack sx={{ height: "8vh" }} justify="center" p={0}>
        <Group position="right" p="xs">
          <TextInput
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            sx={{ flexGrow: 1 }}
            placeholder="Say something nice . . . "
            rightSection={
              <ActionIcon
                onClick={() =>
                  toast("Not yet ready", {
                    icon: "💔",
                  })
                }
              >
                <MoodHappy />
              </ActionIcon>
            }
            onKeyDown={
              !/\S/.test(value)
                ? undefined
                : value.length < 2
                ? undefined
                : getHotkeyHandler([["Enter", sendMessage]])
            }
          />
          <ActionIcon
            onClick={() => sendMessage()}
            variant="hover"
            size="lg"
            disabled={
              !/\S/.test(value) ? true : value.length < 2 ? true : false
            }
          >
            <Send />
          </ActionIcon>
        </Group>
      </Stack>
    </>
  );
};

export default ChatBox;
