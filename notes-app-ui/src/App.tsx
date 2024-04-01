import { useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Nota 1",
      content: "Contenido de la nota 1",
    },
    {
      id: 2,
      title: "Nota 2",
      content: "Contenido de la nota 2",
    },
    {
      id: 3,
      title: "Nota 3",
      content: "Contenido de la nota 3",
    },
    {
      id: 4,
      title: "Nota 4",
      content: "Contenido de la nota 4",
    },
    {
      id: 5,
      title: "Nota 5",
      content: "Contenido de la nota 5",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(title);
    console.log(content);

    const newNote:Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => {
          handleSubmit(event);
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
        <button type="submit"> Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note, i) => (
          <div key={i} className="note-item">
            <div className="notes-header">
              <button>x</button>
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
