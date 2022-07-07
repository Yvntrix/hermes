import {
  Avatar,
  Button,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, Logout } from "tabler-icons-react";
import { auth, firestore } from "../lib/firebase";
import NotFound from "./404";
import ChatMessage from "./ChatMessage";
import Loading from "./Loading";
import NotLogin from "./NotLogin";
import QuotaReached from "./QuotaReached";

const UserProfile = () => {
  let { uid } = useParams();
  const [details, setDetails] = useState<any[]>([]);
  let datas: any[] = [];
  const [mes, setMes] = useState<any[]>([]);
  let mess: any[] = [];
  const [quota, setQuota] = useState(false);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [loading, setLoading] = useState(true);
  const [no, setNo] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser) {
        getInfo();
        getMessages();
      }
    }, 500);
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
          setTimeout(() => {
            setNo(false);
            setLoading(false);
          }, 500);
        } else {
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        setQuota(true);
      });
  }

  function getMessages() {
    query
      .get()
      .then(async (doc) => {
        doc.forEach((snap) => {
          if (uid == snap.data().uid) {
            mess.push(snap.data());
            setMes(mess);
          }
        });
      })
      .catch((e) => {
        setLoading(false);
        setQuota(true);
      });
  }

  return (
    <>
      {auth.currentUser ? (
        loading ? (
          <Loading />
        ) : quota ? (
          <QuotaReached />
        ) : (
          <Stack sx={{ height: "84vh" }} p="xs">
            {auth.currentUser.uid == uid ? (
              <Group position="apart">
                <Button<"a">
                  component="a"
                  href="/"
                  variant="default"
                  leftIcon={<ChevronLeft />}
                >
                  Go Back
                </Button>
                <Button<"a">
                  component="a"
                  href="/"
                  variant="default"
                  leftIcon={<Logout />}
                  onClick={() => auth.signOut()}
                >
                  Sign Out
                </Button>
              </Group>
            ) : (
              <Group position="left">
                <Button<"a">
                  component="a"
                  href="/"
                  variant="default"
                  leftIcon={<ChevronLeft />}
                >
                  Go Back
                </Button>
              </Group>
            )}
            {!no ? (
              details.map((info, id) => {
                return (
                  <Stack key={id} align="center">
                    <Avatar src={info.photo} size="xl" radius="xl" />
                    <Title order={2}>{info.name}</Title>
                    <Paper sx={{ width: "100%" }}>
                      <Text align="left">Messages Sent:</Text>
                      <Divider my="sm" />
                      <ScrollArea sx={{ height: "50vh" }}>
                        <Stack p="xs">
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
        )
      ) : (
        <>
          <NotLogin />
        </>
      )}
    </>
  );
};

export default UserProfile;
