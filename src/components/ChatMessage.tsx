import {
  ActionIcon,
  Alert,
  Avatar,
  Collapse,
  Group,
  Menu,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import { auth, firestore } from "../lib/firebase";
import calendar from "dayjs/plugin/calendar";
import { useEffect, useState } from "react";
import { CornerUpLeft, DotsVertical, Trash } from "tabler-icons-react";
import { useHover } from "@mantine/hooks";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const ChatMessage = (props: any) => {
  const { text, uid, photoURL, createdAt, id, deleted, repliedTo, ruid } =
    props.message;
  const message = uid === auth.currentUser?.uid ? "right" : "left";
  let color;
  const [msgDate, setMsgDate] = useState("");
  dayjs.extend(calendar);

  useEffect(() => {
    if (ruid != undefined) {
      getUser();
    }

    if (createdAt != null) {
      conditions();
    } else {
      setMsgDate("Just now");
    }
  }, []);
  function conditions() {
    if (dayjs().diff(dayjs.unix(createdAt.seconds), "h") > 48) {
      setMsgDate(dayjs.unix(createdAt.seconds).format("MMMM D, YYYY h:mm A"));
    } else {
      setMsgDate(dayjs.unix(createdAt.seconds).calendar());
    }
  }

  function deleteMe() {
    if (uid == auth.currentUser?.uid) {
      updateDoc(doc(firestore, "messages", id), { deleted: true });
    } else {
      toast.error("This is not yours.");
    }
  }

  if (uid == "4d43TqC5jRMhqOM7hcitTmx4mde2") {
    color = "teal";
  } else {
    if (message == "right") {
      color = "yellow";
    }
    if (message == "left") {
      color = "indigo";
    }
  }
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [rep, setRep] = useState("");

  const getUser = async () => {
    const userSnap = await getDoc(doc(firestore, "users", ruid));
    setName(userSnap.data()?.name);

    const userSnap1 = await getDoc(doc(firestore, "users", uid));
    setName1(userSnap1.data()?.name);

    const replySnap = await getDoc(doc(firestore, "messages", repliedTo));
    setRep(replySnap.data()?.text);
  };

  const [opened, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  function reply() {
    props.replyMessage(id, uid);
  }
  return (
    <>
      <Group
        onMouseEnter={() =>
          deleted == undefined ? setHovered(true) : undefined
        }
        onMouseLeave={() => setHovered(false)}
        position={message}
        spacing="xs"
        align="flex-start"
        noWrap
      >
        <Avatar<"a">
          component="a"
          href={`/user/` + uid}
          src={photoURL}
          radius="xl"
          hidden={message == "right" ? true : false}
        />
        <Stack p={0} spacing={2} sx={{ maxWidth: "80%" }}>
          <Group position={message} spacing={3} align="center" noWrap>
            {hovered ? (
              <Menu
                position="top"
                placement="center"
                size="xs"
                hidden={message == "left"}
                control={
                  <ActionIcon radius="xl" color="dark">
                    <DotsVertical size={20} />
                  </ActionIcon>
                }
              >
                <Menu.Item
                  onClick={() => deleteMe()}
                  color="red"
                  icon={<Trash size={14} />}
                >
                  Delete
                </Menu.Item>
                <Menu.Item
                  onClick={() => reply()}
                  icon={<CornerUpLeft size={14} />}
                >
                  Reply
                </Menu.Item>
              </Menu>
            ) : (
              ""
            )}
            <Stack p={0} spacing={0} m={0}>
              <Stack
                p={0}
                spacing={0}
                m={0}
                hidden={
                  deleted == undefined
                    ? repliedTo == undefined
                      ? true
                      : false
                    : true
                }
              >
                <Group
                  align="center"
                  position="center"
                  style={{ position: "relative", bottom: -10 }}
                  p={0}
                  spacing={0}
                  m={0}
                >
                  <CornerUpLeft size={15} />
                  <Text size="xs" align={message} p={0}>
                    {uid == auth.currentUser?.uid ? "You" : name1} replied to{" "}
                    {ruid == uid
                      ? uid == auth.currentUser?.uid
                        ? "yourself"
                        : "themself"
                      : ruid == auth.currentUser?.uid
                      ? "you"
                      : name}
                  </Text>
                </Group>
                <Group position={message}>
                  <Alert
                    sx={{ bottom: "-10px", zIndex: -1 }}
                    color="gray"
                    radius="lg"
                    py="xs"
                  >
                    {rep}
                  </Alert>
                </Group>
              </Stack>
              <Group position={message}>
                <Alert
                  sx={{}}
                  color={color}
                  radius="lg"
                  py="xs"
                  variant={deleted == undefined ? "light" : "outline"}
                  onClick={() => setOpen((o) => !o)}
                >
                  {deleted == undefined ? (
                    text
                  ) : (
                    <Text color={color} size="xs">
                      Message removed
                    </Text>
                  )}
                </Alert>
              </Group>
            </Stack>
            {hovered ? (
              <Menu
                position="top"
                placement="center"
                hidden={message == "right"}
                size="xs"
                control={
                  <ActionIcon radius="xl" color="dark">
                    <DotsVertical size={20} />
                  </ActionIcon>
                }
              >
                <Menu.Item
                  onClick={() => deleteMe()}
                  color="red"
                  icon={<Trash size={14} />}
                >
                  Delete
                </Menu.Item>
                <Menu.Item
                  onClick={() => reply()}
                  icon={<CornerUpLeft size={14} />}
                >
                  Reply
                </Menu.Item>
              </Menu>
            ) : (
              ""
            )}
          </Group>
          <Collapse in={opened} px="xs">
            {
              <Text size="xs" align={message} color="dimmed">
                {msgDate}
              </Text>
            }
          </Collapse>
        </Stack>
      </Group>
    </>
  );
};

export default ChatMessage;
