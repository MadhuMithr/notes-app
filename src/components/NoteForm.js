import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice";

export default function NoteForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [tagsStr, setTagsStr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
    dispatch(addNote({ text: text.trim(), tags }));
    setText("");
    setTagsStr("");
  };

  return (
    <form className="note-form" onSubmit={submit}>
      <textarea
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="tags-input"
        placeholder="Tags (comma separated) e.g. work,ideas"
        value={tagsStr}
        onChange={(e) => setTagsStr(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">Add Note</button>
      </div>
    </form>
  );
}
