import { Center, Loader, Stack } from "@mantine/core";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query as any, { idField: "id" } as any);

  const [loading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 500);
  return (
    <>
      {loading ? (
        <Center sx={{ flexGrow: 1 }}>
          <Loader color="grape" />
        </Center>
      ) : (
        <>
          {" "}
          <Stack sx={{ flexGrow: 1 }}>
            <Stack>
              {messages &&
                messages.map((msg, id) => {
                  return <ChatMessage key={id} message={msg} />;
                })}
            </Stack>
          </Stack>
          <ChatBox />
        </>
      )}
    </>
  );
};

export default ChatRoom;
