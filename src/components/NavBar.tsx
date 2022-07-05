import {
  Avatar,
  Button,
  Group,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Logout, MessageCircle } from "tabler-icons-react";
import { auth } from "../lib/firebase";

const NavBar = () => {
  return (
    <>
      <Paper radius={0}>
        <Group
          position="apart"
          p="sm"
          align="center"
          sx={{ height: "8vh", borderBottom: "1px solid #A6A7AB" }}
        >
          <Text
            variant="gradient"
            gradient={{ from: "yellow", to: "orange", deg: 90 }}
          >
            <Group align="center">
              <UnstyledButton<"a"> component="a" href="/">
                <Title>Hermes</Title>
              </UnstyledButton>
              <MessageCircle color="orange" />
            </Group>
          </Text>
          {auth.currentUser ? (
            <Avatar<"a">
              component="a"
              href={`/user/` + auth.currentUser.uid}
              src={auth.currentUser.photoURL}
              radius="xl"
            />
          ) : (
            ""
          )}
        </Group>
      </Paper>
    </>
  );
};

export default NavBar;
