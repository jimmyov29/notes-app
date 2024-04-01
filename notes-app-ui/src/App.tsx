import { FormEvent, useEffect, useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

    // const newNote:Note = {
    //   id: notes.length + 1,
    //   title: title,
    //   content: content
    // }
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdatedNote = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    // const updateNote: Note = {
    //   id: selectedNote.id,
    //   title: title,
    //   content: content,
    // };

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const updateNote = await response.json();

      const updateNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updateNote : note
      );
      setNotes(updateNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: "DELETE",
      });
      const updateNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updateNotes);
    } catch (e) {}
  };

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => {
          selectedNote ? handleUpdatedNote(event) : handleAddNote(event);
        }}
      >
        <input
          placeholder="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        />
        <textarea
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          placeholder="Content"
          rows={10}
          required
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit"> Save</button>
            <button onClick={handleCancel}> Cancel</button>
          </div>
        ) : (
          <button type="submit"> Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note, i) => (
          <div
            key={i}
            onClick={() => {
              handleNoteClick(note);
            }}
            className="note-item"
          >
            <div className="notes-header">
              <button
                onClick={(event) => {
                  deleteNote(event, note.id);
                }}
              >
                x
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
