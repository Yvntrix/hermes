import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "../lib/firebase";
import ChatRoom from "./ChatRoom";
import GoogleSignIn from "./GoogleSignIn";
import Loading from "./Loading";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile";

const Home = () => {
  const [user] = useAuthState(auth as any);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 400);
  });

  return (
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
          <BrowserRouter>
            <Routes>
              <Route path={`/user/:uid`} element={<UserProfile />} />

              <Route
                path="/home"
                element={user ? <ChatRoom /> : <GoogleSignIn />}
              ></Route>
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </Container>
  );
};

export default Home;
