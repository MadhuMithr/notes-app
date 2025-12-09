import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Controls from "./components/Controls";
import { setDarkMode } from "./store/notesSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(s => s.notes.ui.darkMode);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    dispatch(setDarkMode(darkMode)); // keep store consistent (no-op)
  }, [darkMode, dispatch]);

  return (
    <div className="app">
      <Header />
      <main>
        <div className="main-column">
          <NoteForm />
          <Controls />
          <NotesList />
        </div>
      </main>
    </div>
  );
}

export default App;
