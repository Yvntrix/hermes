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
import dayjs from "dayjs";
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
  const [quota, setQuota] = useState(false);
  const [loading, setLoading] = useState(true);
  const [no, setNo] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser) {
        getInfo();
      }
    }, 400);
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
          }, 420);
        } else {
          setLoading(false);
        }
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
                  href="/home"
                  variant="default"
                  leftIcon={<ChevronLeft />}
                >
                  Go Back
                </Button>
                <Button<"a">
                  component="a"
                  href="/home"
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
                    <Group>
                      <Text weight={550}>Date Joined:</Text>
                      <Text>
                        {dayjs
                          .unix(info.dateJoined.seconds)
                          .format("MMMM D, YYYY h:mm A")}
                      </Text>
                    </Group>
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
