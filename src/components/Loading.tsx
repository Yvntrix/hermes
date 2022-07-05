import { Center, Group, Kbd, Loader, Stack, Text } from "@mantine/core";

const Loading = () => {
  return (
    <Center sx={{ flexGrow: 1 }}>
      <Stack align="center" >
        <Text weight={550}>Stuck on loading? just press</Text>
        <Group>
          <Kbd>ctrl</Kbd> + <Kbd>R</Kbd>
        </Group>

        <Loader color="grape" />
      </Stack>
    </Center>
  );
};

export default Loading;
