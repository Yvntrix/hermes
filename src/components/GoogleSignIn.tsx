import { Alert, Button, Center, Stack, Text } from "@mantine/core";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { AlertCircle, BrandGoogle } from "tabler-icons-react";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const signInWithGoogle = async () => {
    setLoading(true);
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <>
      <Stack align="center" spacing="md" p="xs">
        <Alert icon={<AlertCircle size={16} />} title="Warning" color="yellow">
          <Text weight={600}>
            Do not violate the community guidelines or you will be banned for
            life!
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
