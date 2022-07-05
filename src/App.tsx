import { Box, Center, Container, Divider, Loader } from "@mantine/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";

import GoogleSignIn from "./components/GoogleSignIn";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";
import { auth } from "./lib/firebase";

function App() {
  const [user] = useAuthState(auth as any);
  const [loading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 700);
  return (
    <>
      <Container
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {loading ? (
          <Loading/>
        ) : (
          <>
            <NavBar />
            <BrowserRouter>
              <Routes>
                <Route path={`/user/:uid`} element={<UserProfile />} />

                <Route
                  path="/"
                  element={user ? <ChatRoom /> : <GoogleSignIn />}
                ></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
