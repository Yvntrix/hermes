import { Box, Container } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/ChatRoom";

import GoogleSignIn from "./components/GoogleSignIn";
import NavBar from "./components/NavBar";
import { auth } from "./lib/firebase";

function App() {
  const [user] = useAuthState(auth as any);
  return (
    <>
      <Container
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        p={0}
      >
        <NavBar />
        {user ? <ChatRoom /> : <GoogleSignIn />}
      </Container>
    </>
  );
}

export default App;
