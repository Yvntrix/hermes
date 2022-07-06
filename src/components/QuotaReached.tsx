import { Alert, Center, Stack, Text } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";

const QuotaReached = () => {
  return (
    <Center sx={{ flexGrow: 1 }}>
      <Stack align="center" p="lg">
        <Alert icon={<AlertCircle size={16} />} title="Oh no!" color="red">
          Unfortunately our Database reached its limit, Sorry for inconvinience.
          Come back again tomorrow, Thank you for understanding !
        </Alert>
      </Stack>
    </Center>
  );
};

export default QuotaReached;
