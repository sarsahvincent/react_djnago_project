import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";
import Note from "./pages/note/Note";
import SimpleJWTHome from "./pages/simple_jwt/HomePage";
import SimpleJWTLoign from "./pages/simple_jwt/LoginPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<SimpleJWTHome />} />
          </Route>
          <Route path="/login" element={<SimpleJWTLoign />} />
          <Route path="/note" element={<Note />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
