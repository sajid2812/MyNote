// ######## imports ########

import { Add } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../Global/Context";

// ######## component ########

const EditNote = (props) => {
  // ######## global variables ########
  const { updateNoteToDatabase } = useContext(ContextProvider);

  // ######## props ########
  const { currentNote, toggleModal } = props;

  // ######## state variables ########
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    content: "",
    pin: false,
  });

  // ######## handling changes ########

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  // ######## handling submit ########

  const submitNote = (e) => {
    e.preventDefault();
    updateNoteToDatabase(note, currentNote.id);
    toggleModal(false);
  };

  // ######## handling form close ########

  const closeForm = (e) => {
    const className = e.target.getAttribute("class");
    if (className === "modal") {
      toggleModal(false);
    }
  };

  useEffect(() => {
    setNote({
      title: currentNote.title,
      tagline: currentNote.tagline,
      content: currentNote.content,
      pin: currentNote.pin,
    });
  }, []);
  return (
    <div className="modal" onClick={closeForm}>
      <form className="create-note edit-note">
        <div>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          ></input>
          <input
            name="tagline"
            onChange={handleChange}
            value={note.tagline}
            placeholder="Tagline"
          ></input>
        </div>

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        ></textarea>
        <div className="button_container">
          <Zoom in={true}>
            <button
              disabled={note.content === ""}
              type="button"
              className="add"
              style={{
                backgroundColor: note.content !== "" ? "green" : "",
              }}
              onClick={submitNote}
            >
              <Add />
            </button>
          </Zoom>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
