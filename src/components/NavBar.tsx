import {
  Avatar, Group,
  Paper,
  Text,
  Title,
  UnstyledButton
} from "@mantine/core";
import { MessageCircle } from "tabler-icons-react";
import { auth } from "../lib/firebase";
import DarkMode from "./DarkMode";

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

          <Text
            variant="gradient"
            gradient={{ from: "grape", to: "cyan", deg: 90 }}
          >
            <Group align="center">
              <UnstyledButton<"a"> component="a" href="/">
                <Title>Hermes</Title>
              </UnstyledButton>
              <MessageCircle color="#4dabf7" />
            </Group>
          </Text>
          <DarkMode />
        </Group>
      </Paper>
    </>
  );
};

export default NavBar;
