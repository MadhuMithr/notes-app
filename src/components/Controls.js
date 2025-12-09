import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch, setTagFilter, setShowArchived
} from "../store/notesSlice";

export default function Controls() {
  const dispatch = useDispatch();
  const { search, tagFilter, showArchived } = useSelector(s => s.notes.ui);
  const allTags = Array.from(new Set(
    useSelector(s => s.notes.items.flatMap(n => n.tags || []))
  ));

  return (
    <div className="controls">
      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <select
        value={tagFilter}
        onChange={(e) => dispatch(setTagFilter(e.target.value))}
      >
        <option value="">All tags</option>
        {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
      </select>
      <label className="small-switch">
        <input
          type="checkbox"
          checked={showArchived}
          onChange={(e) => dispatch(setShowArchived(e.target.checked))}
        />
        <span>Show archived</span>
      </label>
    </div>
  );
}
