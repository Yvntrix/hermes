import { Container } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GoogleSignIn from "./components/GoogleSignIn";
import NavBar from "./components/NavBar";
import { auth } from "./lib/firebase";

function App() {
  const [user] = useAuthState(auth as any);
  return (
    <>
      <Container sx={{ minHeight: "100vh" }} p={0}>
        <NavBar />
        {user ? "" : <GoogleSignIn />}
      </Container>
    </>
  );
}

export default App;
