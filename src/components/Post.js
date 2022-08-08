import React from "react";

function Post({ item, onClick }) {
  return (
    <div
      className="posts"
      style={{
        padding: 10,

        minHeight: 160,
        background: "white",
        borderRadius: 10,
        margin: 10,
        transition: "all 1.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>{item?.title}</h2>
        <div style={{ color: "blue", cursor: "pointer" }} onClick={onClick}>
          X
        </div>
      </div>
      <p>{item?.content}</p>
    </div>
  );
}

export default Post;
