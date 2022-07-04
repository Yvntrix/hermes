import { Button, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { Logout } from "tabler-icons-react";
import { auth } from "../lib/firebase";

const NavBar = () => {
  return (
    <>
      <Paper radius={0} sx={{ height: "8vh" }}>
        <Group position="apart" p="sm">
          <Text
            variant="gradient"
            gradient={{ from: "purple", to: "cyan", deg: 90 }}
          >
            <Title>Hermes</Title>
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
