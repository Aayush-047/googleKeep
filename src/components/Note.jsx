import React from "react";
import { IoMdCreate, IoIosTrash } from "react-icons/io";
const Note = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={onDelete}>
        <IoIosTrash size={20}></IoIosTrash>
      </button>
      <button className="edit-button" onClick={onEdit}>
        <IoMdCreate size={20}></IoMdCreate>
      </button>
    </div>
  );
};

export default Note;
