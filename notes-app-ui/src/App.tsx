import { FormEvent, useState } from "react";
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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title)
    setContent(note.content)
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote:Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdatedNote = (event: FormEvent) => {
    event.preventDefault();

    if(!selectedNote){
      return
    }

    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updateNotesList = notes.map((note)=>
      note.id === selectedNote.id
      ? updateNote
      : note
    )
    setNotes(updateNotesList);
    setTitle('')
    setContent('')
    setSelectedNote(null)
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  const deleteNote = (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation();
    const updateNotes = notes.filter((note)=> note.id !== noteId)
    setNotes(updateNotes)

  }

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => {
          selectedNote 
          ? handleUpdatedNote(event)
          : handleAddNote(event);
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
              <button onClick={(event)=>{
                deleteNote(event, note.id)
              }}>x</button>
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
