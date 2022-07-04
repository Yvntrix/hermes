import {
  ActionIcon,
  Avatar,
  Center,
  Divider,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft } from "tabler-icons-react";
import { auth, firestore } from "../lib/firebase";
import NotFound from "./404";
import ChatMessage from "./ChatMessage";

const UserProfile = () => {
  let { uid } = useParams();
  const [details, setDetails] = useState<any[]>([]);
  let datas: any[] = [];
  const [mes, setMes] = useState<any[]>([]);
  let mess: any[] = [];
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [loading, setLoading] = useState(true);
  const [no, setNo] = useState(true);
  useEffect(() => {
    getInfo();
    getMessages();
  }, []);
  function getInfo() {
    firestore
      .collection("users")
      .doc(uid)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          datas.push(await doc.data());
          setDetails(datas);
          setNo(false);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else {
          setLoading(false);
        }
      });
  }

  function getMessages() {
    query.get().then(async (doc) => {
      doc.forEach((snap) => {
        if (uid == snap.data().uid) {
          mess.push(snap.data());
          setMes(mess);
        }
      });
    });
  }

  return (
    <>
      {loading ? (
        <Center sx={{ flexGrow: 1 }}>
          <Loader color="grape" />
        </Center>
      ) : (
        <Stack sx={{ height: "84vh" }} pt="xs">
          {!no ? (
            details.map((info, id) => {
              return (
                <Stack key={id} align="center">
                  <Avatar src={info.photo} size="xl" radius="xl" />
                  <Title order={2}>{info.name}</Title>
                  <Paper sx={{ width: "70vw" }}>
                    <Text align="left">Messages Sent:</Text>
                    <Divider my="sm" />
                    <ScrollArea sx={{ height: "50vh" }}>
                      <Stack
                        align={
                          uid == auth.currentUser?.uid
                            ? "flex-end"
                            : "flex-start"
                        }
                      >
                        {mes.map((messages, id) => {
                          return <ChatMessage key={id} message={messages} />;
                        })}
                      </Stack>
                    </ScrollArea>
                    <Divider my="sm" />
                  </Paper>
                </Stack>
              );
            })
          ) : (
            <NotFound />
          )}
        </Stack>
      )}
    </>
  );
};

export default UserProfile;
