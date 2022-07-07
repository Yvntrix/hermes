import {
  Box,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Divider,
  Loader,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";
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
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  setTimeout(() => {
    setloading(false);
  }, 700);
  return (
    <>
    <Toaster/>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Container
            p={0}
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {loading ? (
              <Loading />
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
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
