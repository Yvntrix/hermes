import { ActionIcon, Alert, Group, ScrollArea, Stack } from "@mantine/core";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "tabler-icons-react";
import { auth, firestore } from "../lib/firebase";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

import Loading from "./Loading";
import NavBar from "./NavBar";
import QuotaReached from "./QuotaReached";

const ChatRoom = () => {
  const [mes, setMes] = useState<any[]>([]);
  let mess: any[] = [];
  const [loading, setloading] = useState(true);
  const [quota, setQuota] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;
  const [replyInfo, setReplyInfo] = useState<any[]>([]);
  let info: any[] = [];
  const [id, setId] = useState("");

  useEffect(() => {
    setUser();
    getMessages();
  }, []);

  const getMessages = () => {
    firestore
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(100)
      .onSnapshot((snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "added") {
            mess = [];
            snap.docs.reverse().map((doc) => {
              mess.push({
                id: doc.id,
                text: doc.data().text,
                uid: doc.data().uid,
                createdAt: doc.data().createdAt,
                photoURL: doc.data().photoURL,
                deleted: doc.data().deleted,
                repliedTo: doc.data().repliedTo,
                ruid: doc.data().ruid,
                rtext: doc.data().rtext,
              });
            });
          }
          if (change.type === "modified") {
            mess = [];
            snap.docs.reverse().map((doc) => {
              mess.push({
                id: doc.id,
                text: doc.data().text,
                uid: doc.data().uid,
                createdAt: doc.data().createdAt,
                photoURL: doc.data().photoURL,
                deleted: doc.data().deleted,
                repliedTo: doc.data().repliedTo,
                ruid: doc.data().ruid,
                rtext: doc.data().rtext,
              });
            });
          }
        });
        setMes(mess);

        setloading(false);
        setTimeout(() => {
          goBot();
        }, 300);
      });
  };

  const setUser = async () => {
    if (user) {
      const { uid, photoURL, displayName, email } = user;
      const usersRef = firestore.collection("users").doc(uid);
      await usersRef
        .get()
        .then(async (snap) => {
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
        })
        .catch((e) => {
          setQuota(true);
        });
    }
  };

  function goBot() {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
    setHidden(true);
    setId("");
  }
  const [ruid, setRuid] = useState("");
  function replyMessage(params: any) {
    getMessage(params.msgId);
    setRuid(params);
  }

  const getMessage = async (id: string) => {
    const replySnap = await getDoc(doc(firestore, "messages", id));
    const userSnap = await getDoc(
      doc(firestore, "users", await replySnap.data()?.uid)
    );
    const reply = replySnap.data()?.text;
    let name = "";
    if (replySnap.data()?.uid == auth.currentUser?.uid) {
      name = "yourself";
    } else {
      name = userSnap.data()?.name;
    }
    info.push({ text: reply, name: name });
    setReplyInfo(info);
    setId(id);
    setHidden(false);
  };
  const [hidden, setHidden] = useState(true);

  return (
    <>
      {loading ? (
        <Loading />
      ) : quota ? (
        <QuotaReached />
      ) : (
        <>
          <NavBar />
          <Stack sx={{ height: "84vh" }} pt="xs">
            <ScrollArea p="xs" scrollbarSize={1} sx={{ height: "84vh" }}>
              <Stack>
                <Group position="center" pt="xs">
                  <ActionIcon
                    color="violet"
                    sx={{ position: "absolute" }}
                    onClick={goBot}
                  >
                    <ChevronDown />
                  </ActionIcon>
                </Group>
                {mes.map((msg, id) => {
                  return (
                    <ChatMessage
                      key={id}
                      message={msg}
                      replyMessage={replyMessage}
                    />
                  );
                })}
              </Stack>
              <div ref={dummy}></div>
            </ScrollArea>

            {replyInfo.map((data, id) => {
              return (
                <Alert
                  key={id}
                  sx={{ minHeight: "10%" }}
                  hidden={hidden}
                  title={`Replying to ` + data.name}
                  color="gray"
                  p="xs"
                  radius={0}
                  withCloseButton
                  onClose={() => {
                    setHidden(true);
                    setId("");
                  }}
                >
                  {data.text}
                </Alert>
              );
            })}
          </Stack>
          <ChatBox fn={goBot} id={id} ruid={ruid} />
        </>
      )}
    </>
  );
};
export default ChatRoom;
