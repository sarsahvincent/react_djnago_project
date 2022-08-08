import React, { useState, useEffect } from "react";
import "../../App.css";
import Post from "../../components/Post";

const baseUrl = "http://127.0.0.1:8000";
function Note() {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getAllNotes = async () => {
    const response = await fetch(`${baseUrl}/posts/`);

    const data = await response.json();

    if (response.ok) {
      setNotes(data);
      console.log("data", data);
    } else {
      console.log("Error");
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();

    const new_request = new Request(`${baseUrl}/posts/`, {
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "Application/Json",
      },
      method: "POST",
    });

    const response = await fetch(new_request);

    const data = await response.json();
    await getAllNotes();

    if (response.ok) {
      console.log(data);
    } else {
      console.log("Error posting note");
    }
    setTitle("");
    setContent("");
    setOpenModal(false);
  };

  const deletePost = async (id) => {
    const new_request = new Request(`${baseUrl}/posts/${id}/`, {
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "Application/Json",
      },
      method: "DELETE",
    });

    const response = await fetch(new_request);

    if (response.ok) {
      console.log("success");
    } else {
      console.log("Error posting note");
    }
    await getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <div style={{ background: "rgb(7,43,80)", height: "100vh", padding: 0 }}>
      <header
        style={{
          marginRight: 10,
          marginLeft: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "white" }}>Note Book</h2>
        <button
          onClick={handleOpenModal}
          style={{
            textTransform: "uppercase",
            borderRadius: 10,
            padding: 10,
            fontWeight: "bold",
          }}
        >
          Add Note
        </button>
      </header>

      <body
        style={{
          display: "flex",
          height: "90%",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        {notes.length < 1 ? (
          <div>
            <h3 style={{ color: "white", fontSize: 40 }}>No Note</h3>
          </div>
        ) : (
          <div
            className="noteList"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              maxWidth: 1600,
            }}
          >
            {notes?.map((item, _) => (
              <Post
                item={item}
                onClick={() => {
                  deletePost(item.id);
                }}
              />
            ))}
          </div>
        )}

        {openModal && (
          <section
            style={{
              height: "100%",
              width: "100%",
              top: 0,
              left: 0,
              position: "fixed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.629",
            }}
          >
            <form
              className="form"
              onSubmit={submitForm}
              action=""
              style={{
                maxWidth: 500,
                padding: "20px",
                background: "white",
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                alignItems: "center",
                justifyContent: "center",
                height: 500,
                marginTop: 20,
                borderRadius: 30,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "rgb(7,43,80)",
                }}
              >
                <p>Create a Note</p>
                <div
                  onClick={handleCloseModal}
                  style={{ cursor: "pointer", fontWeight: "600" }}
                >
                  x
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "80%",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="">Title</label>
                  <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ height: 30 }}
                    type="text"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="">Content</label>
                  <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <button
                style={{
                  color: "white",
                  border: "none",
                  padding: 10,
                  borderRadius: 10,
                  background: "rgb(7,43,80)",
                  width: "30%",
                }}
              >
                SAVE
              </button>
            </form>
          </section>
        )}
      </body>
    </div>
  );
}

export default Note;
