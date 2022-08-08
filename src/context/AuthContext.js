import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? jwt_decode(localStorage.getItem("tokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );
  async function getUser(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      if (response.status === 200) {
        setAuthTokens(response?.data);
        setUser(jwt_decode(response?.data.access));
        localStorage.setItem("tokens", JSON.stringify(response?.data));
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  }

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  const updateToken = async (e) => {
    console.log("update token called");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: authTokens.refresh,
        }
      );
      if (response.status === 200) {
        setAuthTokens(response?.data);
        setUser(jwt_decode(response?.data.access));
        localStorage.setItem("tokens", JSON.stringify(response?.data));
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      logoutUser();
    }
  };

  let contextData = {
    user,
    loginUser: getUser,
    logoutUser,
    updateToken,
  };

  useEffect(() => {
    let fourMinutes = 100 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
