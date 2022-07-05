import { Button, Center, Stack, Title } from "@mantine/core";

const NotLogin = () => {
  return (
    <Center sx={{ flexGrow: 1 }}>
      <Stack align="center">
        <Title>Please Sign In before viewing this profile</Title>
        <Button<"a"> component="a" href="/" variant="default">
          Sign in
        </Button>
      </Stack>
    </Center>
  );
};

export default NotLogin;
