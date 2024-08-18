import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const projectID = "65849bc2-ecd6-4c41-941e-78dd8de7a514";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": projectID,
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      const response = await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      console.log(response.data);

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      navigate("/");
      setError("");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError("Oops, incorrect credentials.");
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  );
};

export default LoginForm;
