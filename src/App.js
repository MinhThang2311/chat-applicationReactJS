import { ChatEngine } from "react-chat-engine";
import { Route, Routes, Navigate } from "react-router-dom";

import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import "./App.css";

const projectID = "65849bc2-ecd6-4c41-941e-78dd8de7a514";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("username");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <ChatEngine
              height="100vh"
              projectID={projectID}
              userName={localStorage.getItem("username")}
              userSecret={localStorage.getItem("password")}
              renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
              onNewMessage={() =>
                new Audio(
                  "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
                ).play()
              }
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};
export default App;
