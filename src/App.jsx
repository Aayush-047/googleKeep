import React, { useState, useEffect } from "react";
import "./App.css";
import Note from "./Note";
import Navbar from "./Navbar";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const handleAddNote = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />
      <hr />
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="add-note-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const content = e.target.content.value;
            const id = Date.now().toString();
            handleAddNote({ id, title, content });
            e.target.reset();
          }}
        >
          <input type="text" name="title" placeholder="Title" />
          <textarea name="content" placeholder="Note content"></textarea>
          <button type="submit" className="add-button">
            <i className="fas fa-plus"></i>
          </button>
        </form>
      </div>
      <div className="notes-container">
        <div className="notes">
          {filteredNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
