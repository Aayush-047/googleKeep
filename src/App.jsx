import React, { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";
import Navbar from "./components/Navbar";
import { IoIosAdd, IoIosRefresh } from "react-icons/io";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [inputExpanded, setInputExpanded] = useState(false);

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
      <div className="Navbarbig">
        <Navbar />
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div className={`add-note-container${inputExpanded ? " expanded" : ""}`}>
        {inputExpanded ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editingNote) {
                const updatedNotes = notes.map((note) =>
                  note.id === editingNote.id
                    ? { ...note, title: editTitle, content: editContent }
                    : note
                );
                setNotes(updatedNotes);
                localStorage.setItem("notes", JSON.stringify(updatedNotes));
                setEditingNote(null);
                setEditTitle("");
                setEditContent("");
              } else {
                const title = editTitle;
                const content = editContent;
                const id = Date.now().toString();
                handleAddNote({ id, title, content });
              }
              setInputExpanded(false);
              setEditTitle("");
              setEditContent("");
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              name="content"
              placeholder="Note content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button type="submit" className="add-button">
              {editingNote ? (
                <IoIosRefresh size={35}></IoIosRefresh>
              ) : (
                <IoIosAdd size={35} />
              )}
            </button>
          </form>
        ) : (
          <input
            type="text"
            className="input-trigger"
            placeholder="Take a Note"
            onClick={() => setInputExpanded(true)}
            readOnly
          />
        )}
      </div>
      <div className="notes-container">
        <div className="notes">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-container">
              <Note
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
                onEdit={() => {
                  setEditingNote(note);
                  setEditTitle(note.title);
                  setEditContent(note.content);
                  setInputExpanded(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
