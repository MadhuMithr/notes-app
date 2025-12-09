import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode, importSampleNotes, clearAll } from "../store/notesSlice";

const sample = [
  { id: "s1", text: "Buy groceries: milk, eggs, bread", tags: ["personal","shopping"], createdAt: new Date().toISOString(), pinned:true, archived:false },
  { id: "s2", text: "Project meeting notes — prepare slides", tags: ["work"], createdAt: new Date().toISOString(), pinned:false, archived:false },
  { id: "s3", text: "Book flight tickets", tags: ["travel"], createdAt: new Date().toISOString(), pinned:false, archived:true }
];

export default function Header() {
  const dispatch = useDispatch();
  const dark = useSelector(s => s.notes.ui.darkMode);

  return (
    <header className="header">
      <h1>Notes Pro</h1>
      <div className="header-actions">
        <button onClick={() => dispatch(importSampleNotes(sample))} title="Load sample notes">Load Sample</button>
        <button onClick={() => dispatch(clearAll())} title="Clear all notes">Clear All</button>
        <label className="switch">
          <input
            type="checkbox"
            checked={dark}
            onChange={(e) => dispatch(setDarkMode(e.target.checked))}
          />
          <span>Dark</span>
        </label>
      </div>
    </header>
  );
}
