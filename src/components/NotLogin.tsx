import { Button, Center, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const NotLogin = () => {
  return (
    <Center sx={{ flexGrow: 1 }}>
      <Stack align="center" justify="center">
        <Title align="center" order={2}>
          Please Sign In before viewing this profile
        </Title>
        <Button<typeof Link> component={Link} to="/home" variant="default">
          Sign in
        </Button>
      </Stack>
    </Center>
  );
};

export default NotLogin;
