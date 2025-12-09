import React from "react";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";

export default function NotesList() {
  const items = useSelector(s => s.notes.items);
  const { search, tagFilter, showArchived } = useSelector(s => s.notes.ui);

  // filter
  const filtered = items.filter(note => {
    if (!showArchived && note.archived) return false;
    if (tagFilter && !(note.tags || []).includes(tagFilter)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!note.text.toLowerCase().includes(q) && !(note.tags || []).join(" ").toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // sort: pinned first, then newest
  filtered.sort((a,b) => (b.pinned - a.pinned) || (new Date(b.createdAt) - new Date(a.createdAt)));

  return (
    <div className="notes-list">
      {filtered.length === 0 ? <p className="empty">No notes found.</p> :
        filtered.map(note => <NoteItem key={note.id} note={note} />)
      }
    </div>
  );
}
