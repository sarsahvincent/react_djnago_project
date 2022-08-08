import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

function LoginPage() {
  let { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={loginUser}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
