import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function HomePage() {
  let { name } = useContext(AuthContext);
  return <div>{name}</div>;
}

export default HomePage;
