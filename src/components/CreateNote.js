// ######## imports ########

import React, { useContext, useState } from "react";
import { Add } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Zoom } from "@mui/material";
import { ContextProvider } from "../Global/Context";

// ######## component ########

function CreateNote() {
  // ######## global variables ########
  const { addNoteToDatabase } = useContext(ContextProvider);

  // ######## state variables ########
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    content: "",
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
    addNoteToDatabase(note);
    setNote({ title: "", content: "", tagline: "" });
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
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
        )}

        <textarea
          name="content"
          onClick={() => setIsExpanded(true)}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        ></textarea>
        <div className="button_container">
          <Zoom in={isExpanded}>
            <button
              type="button"
              disabled={note.content === ""}
              className="add"
              style={{ backgroundColor: note.content !== "" ? "green" : "" }}
              onClick={submitNote}
            >
              <Add />
            </button>
          </Zoom>
          <Zoom in={isExpanded}>
            <button
              type="button"
              className="minimize"
              onClick={() => setIsExpanded(false)}
            >
              <KeyboardArrowUpIcon />
            </button>
          </Zoom>
          <Zoom in={isExpanded}>
            <button
              type="button"
              className="clear"
              onClick={() => setNote({ title: "", content: "", tagline: "" })}
            >
              <CloseIcon />
            </button>
          </Zoom>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
