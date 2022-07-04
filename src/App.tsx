import { Box, Center, Container, Divider, Loader } from "@mantine/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/ChatRoom";

import GoogleSignIn from "./components/GoogleSignIn";
import NavBar from "./components/NavBar";
import { auth } from "./lib/firebase";

function App() {
  const [user] = useAuthState(auth as any);
  const [loading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 500);
  return (
    <>
      <Container
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {loading ? (
          <Center sx={{ flexGrow: 1 }}>
            <Loader color="grape" />
          </Center>
        ) : (
          <>
            <NavBar />
           
            {user ? <ChatRoom /> : <GoogleSignIn />}
          </>
        )}
      </Container>
    </>
  );
}

export default App;
