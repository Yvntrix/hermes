import { Center, Divider, Loader, ScrollArea, Stack } from "@mantine/core";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query as any, { idField: "id" } as any);

  const [loading, setloading] = useState(true);

  const dummy = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 500);
    setTimeout(() => {
      goBot();
    }, 100);
  });

  function goBot() {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      {loading ? (
        <Center sx={{ flexGrow: 1 }}>
          <Loader color="grape" />
        </Center>
      ) : (
        <>
          <Stack sx={{ height: "84vh" }}>
            <ScrollArea>
              <Stack>
                {messages &&
                  messages.map((msg, id) => {
                    return <ChatMessage key={id} message={msg} />;
                  })}
                <div ref={dummy}></div>
              </Stack>
            </ScrollArea>
          </Stack>
          <ChatBox fn={goBot} />
        </>
      )}
    </>
  );
};

export default ChatRoom;
