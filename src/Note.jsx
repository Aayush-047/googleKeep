import React from "react";

const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={onDelete} className="delete-button">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Note;
