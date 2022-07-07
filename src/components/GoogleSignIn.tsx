import { Alert, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { BrandGoogle } from "tabler-icons-react";
import { auth, googleAuthProvider } from "../lib/firebase";
import NavBar from "./NavBar";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <NavBar />
      <Stack align="center" spacing="md" p="xs">
        <Alert title="Hello there!" color="blue">
          <Text weight={600}>
            Hermes is a simple chat app made with ReactTs, MantineUI, and
            Firebase by{" "}
            <Text
              variant="link"
              component="a"
              href="https://github.com/Yvntrix"
            >
              Yvntrix
            </Text>{" "}
            .
          </Text>
        </Alert>
        <Button
          loading={loading}
          variant="default"
          size="md"
          leftIcon={<BrandGoogle />}
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </Button>
      </Stack>
    </>
  );
};

export default GoogleSignIn;
