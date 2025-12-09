import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, editNote, togglePin, toggleArchive } from "../store/notesSlice";

export default function NoteItem({ note }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const [tagsStr, setTagsStr] = useState((note.tags || []).join(", "));

  const save = () => {
    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
    dispatch(editNote({ id: note.id, text, tags }));
    setEditing(false);
  };

  return (
    <article className={`note ${note.pinned ? "pinned" : ""} ${note.archived ? "archived" : ""}`}>
      <div className="note-body">
        {editing ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="tags, comma separated" />
          </>
        ) : (
          <>
            <p className="note-text">{note.text}</p>
            <div className="note-meta">
              <small>{new Date(note.createdAt).toLocaleString()}</small>
              <div className="tags">
                {(note.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="note-actions">
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button onClick={() => { setEditing(false); setText(note.text); setTagsStr((note.tags||[]).join(", ")); }}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => dispatch(togglePin(note.id))}>{note.pinned ? "Unpin" : "Pin"}</button>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => dispatch(toggleArchive(note.id))}>{note.archived ? "Unarchive" : "Archive"}</button>
            <button className="delete" onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
          </>
        )}
      </div>
    </article>
  );
}
