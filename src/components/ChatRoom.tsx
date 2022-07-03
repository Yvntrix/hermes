import { firestore } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import { Box, ScrollArea, Stack, Text } from "@mantine/core";
import ChatBox from "./ChatBox";
import { useState } from "react";

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query as any, { idField: "id" } as any);

  return (
    <>
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
  );
};

export default ChatRoom;
