import { Button, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { Logout } from "tabler-icons-react";

const NavBar = () => {
  return (
    <>
      <Paper radius={0}>
        <Group position="apart" p="sm">
          <Text
            variant="gradient"
            gradient={{ from: "purple", to: "cyan", deg: 90 }}
          >
            <Title>Hermes</Title>
          </Text>
          <Button variant="default" leftIcon={<Logout />}>
            Sign Out
          </Button>
        </Group>
        <Divider my="sm" />
      </Paper>
    </>
  );
};

export default NavBar;
