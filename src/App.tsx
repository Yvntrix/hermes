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
import Home from "./components/Home";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";
import { auth } from "./lib/firebase";

function App() {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <>
      <Toaster />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          {}
          <Home />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
