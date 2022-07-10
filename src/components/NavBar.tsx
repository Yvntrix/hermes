import {
  Avatar,
  Group,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { MessageCircle } from "tabler-icons-react";
import { auth } from "../lib/firebase";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <Paper
        radius={0}
        sx={{ boxShadow: "0px 2px 0px 0px rgba(173,181,189,.5)" }}
      >
        <Group
          position="apart"
          p="sm"
          align="center"
          sx={{ height: "8vh" }}
          noWrap
        >
          {auth.currentUser ? (
            <Avatar<typeof Link>
              component={Link}
              to={`/user/` + auth.currentUser.uid}
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
            <Group align="center" noWrap spacing={3}>
              <UnstyledButton<typeof Link> component={Link} to="/home">
                <Title>Hermes</Title>
              </UnstyledButton>
              <MessageCircle color="#4dabf7" size={30} />
            </Group>
          </Text>
          <DarkMode />
        </Group>
      </Paper>
    </>
  );
};

export default NavBar;
