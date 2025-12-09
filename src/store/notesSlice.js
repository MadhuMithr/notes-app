import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each note: { id, text, tags:[], createdAt, pinned, archived }
  ui: { showArchived: false, darkMode: false, search: "", tagFilter: "" }
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ text, tags }) {
        return {
          payload: {
            id: Date.now().toString(),
            text,
            tags,
            createdAt: new Date().toISOString(),
            pinned: false,
            archived: false
          }
        };
      }
    },
    deleteNote(state, action) {
      state.items = state.items.filter(n => n.id !== action.payload);
    },
    editNote(state, action) {
      const { id, text, tags } = action.payload;
      const note = state.items.find(n => n.id === id);
      if (note) {
        note.text = text;
        note.tags = tags;
      }
    },
    togglePin(state, action) {
      const note = state.items.find(n => n.id === action.payload);
      if (note) note.pinned = !note.pinned;
      // optional: keep pinned notes at top by reordering
      state.items.sort((a,b) => (b.pinned - a.pinned) || (new Date(b.createdAt) - new Date(a.createdAt)));
    },
    toggleArchive(state, action) {
      const note = state.items.find(n => n.id === action.payload);
      if (note) note.archived = !note.archived;
    },
    setSearch(state, action) {
      state.ui.search = action.payload;
    },
    setTagFilter(state, action) {
      state.ui.tagFilter = action.payload;
    },
    setShowArchived(state, action) {
      state.ui.showArchived = action.payload;
    },
    setDarkMode(state, action) {
      state.ui.darkMode = action.payload;
    },
    importSampleNotes(state, action) {
      // replaces items (useful for demo)
      state.items = action.payload;
    },
    clearAll(state) {
      state.items = [];
    }
  }
});

export const {
  addNote, deleteNote, editNote, togglePin, toggleArchive,
  setSearch, setTagFilter, setShowArchived, setDarkMode,
  importSampleNotes, clearAll
} = notesSlice.actions;

export default notesSlice.reducer;
