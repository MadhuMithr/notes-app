import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

// load and save helpers
const loadState = () => {
  try {
    const serialized = localStorage.getItem("notes_pro_state_v1");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    console.warn("Failed to load state", e);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("notes_pro_state_v1", serialized);
  } catch (e) {
    console.warn("Failed to save state", e);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    notes: notesReducer
  },
  preloadedState
});

// persist on changes
store.subscribe(() => {
  saveState({
    notes: store.getState().notes
  });
});

export default store;
