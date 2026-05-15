import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API = "http://localhost:5000";

  // FETCH NOTES
  const fetchNotes = async () => {

    try {

      const res = await axios.get(`${API}/notes`);

      if (Array.isArray(res.data)) {
        setNotes(res.data);
      } else {
        setNotes([]);
      }

    } catch (error) {

      console.log(error);

      setNotes([]);
    }
  };

  // LOAD NOTES
  useEffect(() => {
    fetchNotes();
  }, []);

  // CREATE NOTE
  const createNote = async () => {

    if (!title || !content) {
      return alert("Fill all fields");
    }

    try {

      await axios.post(`${API}/notes`, {
        title,
        content,
        userId: 1
      });

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {

    try {

      await axios.delete(`${API}/notes/${id}`);

      fetchNotes();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container">

      <div className="form-card">

        <h1>Notes App</h1>

        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={createNote}>
          Add Note
        </button>

      </div>

      <div className="notes-container">

        {
          notes.length === 0 ? (
            <p className="no-notes">
              No Notes Found
            </p>
          ) : (
            notes.map((note) => (

              <div
                key={note.id}
                className="note-card"
              >

                <h2>{note.title}</h2>

                <p>{note.content}</p>

                <button
                  className="delete-btn"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}

export default App;