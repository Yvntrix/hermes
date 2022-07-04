import { Center, Loader, ScrollArea, Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt").limitToLast(50);

  const [messages] = useCollectionData(query as any, { idField: "id" } as any);

  const [loading, setloading] = useState(true);
  const { height, width } = useViewportSize();
  const dummy = useRef<HTMLDivElement>(null);
  setTimeout(() => {
    setloading(false);
  }, 500);

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
          <Stack sx={{ flexGrow: 1 }}>
            <ScrollArea
              sx={{
                height: height - 155,
              }}
            >
              <Stack>
                {messages &&
                  messages.map((msg, id) => {
                    if (id === messages.length - 1) {
                      goBot();
                    }
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
