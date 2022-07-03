import { Alert, Button, Center, Stack, Text } from "@mantine/core";
import { AlertCircle, BrandGoogle } from "tabler-icons-react";

const GoogleSignIn = () => {
  return (
    <>
      <Center>
        <Stack align="center" spacing="md">
          <Alert
            icon={<AlertCircle size={16} />}
            title="Warning"
            color="yellow"
          >
            <Text weight={600}>
              Do not violate the community guidelines or you will be banned for
              life!
            </Text>
          </Alert>
          <Button variant="default" size="md" leftIcon={<BrandGoogle />}>
            Sign in with Google
          </Button>
        </Stack>
      </Center>
    </>
  );
};

export default GoogleSignIn;
