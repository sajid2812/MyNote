// ######## imports ########

import React, { createContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

// ######## global storage ########

export const ContextProvider = createContext();

const Context = (props) => {
  // ######## global state manager ########

  const [currentPage, setCurrentPage] = useState(1);
  const updateCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const [error, setError] = useState("");
  const closeError = () => {
    setError("");
  };

  // ######## checks internet connection ########
  const isOnline = () => {
    if (!navigator.onLine) {
      throw new Error("No Internet Connection!");
    } else {
      setError("");
    }
  };

  // ######## CREATE ########

  const addNoteToDatabase = async (newNote) => {
    try {
      isOnline();

      const { title, tagline, content } = newNote;
      await addDoc(collection(db, "notes"), {
        title,
        tagline,
        content,
        pin: "false",
        currentTime: serverTimestamp(),
      });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // ######## READ ########

  const [notes, setNotes] = useState([]);
  const fetchNotes = () => {
    try {
      isOnline();
      const q = query(collection(db, "notes"), orderBy("currentTime", "desc"));
      onSnapshot(q, (snp) => {
        setNotes(
          snp.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            tagline: doc.data().tagline,
            content: doc.data().content,
            pin: doc.data().pin,
            currentTime: doc.data().currentTime?.seconds,
          }))
        );
      });

      return notes;
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // ######## UPDATE ########

  const updateNoteToDatabase = async (updatedNote, noteId) => {
    try {
      isOnline();
      await setDoc(doc(db, "notes", noteId), {
        title: updatedNote.title,
        tagline: updatedNote.tagline,
        content: updatedNote.content,
        pin: updatedNote.pin,
        currentTime: serverTimestamp(),
      });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const updatePinToDatabase = async (updatedPin, noteId) => {
    try {
      isOnline();
      await updateDoc(doc(db, "notes", noteId), {
        pin: updatedPin,
        currentTime: serverTimestamp(),
      });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // ######## DELETE ########

  const deleteNoteFromDatabase = async (id) => {
    try {
      isOnline();
      await deleteDoc(doc(db, "notes", id));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <ContextProvider.Provider
      value={{
        notes,
        addNoteToDatabase,
        fetchNotes,
        updateNoteToDatabase,
        deleteNoteFromDatabase,
        updatePinToDatabase,
        currentPage,
        updateCurrentPage,
        error,
        closeError,
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
