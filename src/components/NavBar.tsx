import { Button, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { Logout, MessageCircle, Send } from "tabler-icons-react";
import { auth } from "../lib/firebase";

const NavBar = () => {
  return (
    <>
      <Paper
        radius={0}
        sx={{ height: "8vh", borderBottom: "1px solid #A6A7AB" }}
      >
        <Group position="apart" p="sm">
          <Text
            variant="gradient"
            gradient={{ from: "yellow", to: "orange", deg: 90 }}
          >
            <Group align="center">
              <Title>Hermes</Title>
              <MessageCircle color="orange" />
            </Group>
          </Text>
          {auth.currentUser ? (
            <Button
              variant="default"
              leftIcon={<Logout />}
              onClick={() => auth.signOut()}
            >
              Sign Out
            </Button>
          ) : (
            ""
          )}
        </Group>
      </Paper>
    </>
  );
};

export default NavBar;
