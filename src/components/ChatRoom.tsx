import { ScrollArea, Stack } from "@mantine/core";
import { serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../lib/firebase";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

import Loading from "./Loading";

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query as any, { idField: "id" } as any);

  const [loading, setloading] = useState(true);

  const dummy = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setUser();
    setTimeout(() => {
      setloading(false);
    }, 500);
    setTimeout(() => {
      goBot();
    }, 100);
  }, [messages]);

  const setUser = async () => {
    //@ts-expect-error
    const { uid, photoURL, displayName, email } = auth.currentUser;
    const usersRef = firestore.collection("users").doc(uid);
    await usersRef.get().then(async (snap) => {
      if (snap.exists) {
        await updateDoc(usersRef, {
          name: displayName,
          photo: photoURL,
        });
      } else {
        await usersRef.set({
          name: displayName,
          photo: photoURL,
          email: email,
          dateJoined: serverTimestamp(),
        });
      }
    });
  };

  function goBot() {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Stack sx={{ height: "84vh" }} pt="xs">
            <ScrollArea p="xs" scrollbarSize={0.2}>
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
