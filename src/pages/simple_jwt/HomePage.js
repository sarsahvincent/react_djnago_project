import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function HomePage() {
  let { authTokens , logoutUser} = useContext(AuthContext);
  console.log("authTokens",authTokens);
  const [notes, setNotes] = useState([]);
  let { name } = useContext(AuthContext);

  const getNotes = async () => {
    axios
      .get("http://127.0.0.1:8000/api/notes/", {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNotes(res?.data);
      })
      .catch((error) => {
        logoutUser()
        console.error(error);
      });
  };

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div>
      {name}
      {notes?.map((note, _) => (
        <ul>
          <li>{note.body}</li>
        </ul>
      ))}
    </div>
  );
}

export default HomePage;
