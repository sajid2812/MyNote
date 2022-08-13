// ######## imports ########

import React, { useContext, useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import PushPinIcon from "@mui/icons-material/PushPin";
import { ContextProvider } from "../Global/Context";
import EditNote from "./EditNote";

// ######## component ########

function Note(props) {
  // ######## global variables ########
  const { deleteNoteFromDatabase, updatePinToDatabase } =
    useContext(ContextProvider);

  // ######## state variables ########
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // ######## handling pop-up ########

  function toggleModal(value) {
    setIsNoteModalOpen(value);
  }

  // ######## handling delete ########

  function handleDelete() {
    deleteNoteFromDatabase(props.id);
  }

  // ######## handling pin ########

  function handlePin() {
    updatePinToDatabase(!props.pin, props.id);
  }

  return (
    <>
      {isNoteModalOpen ? (
        <EditNote currentNote={props} toggleModal={toggleModal} />
      ) : (
        ""
      )}

      <div className="note">
        <div style={{ cursor: "pointer" }} onClick={() => toggleModal(true)}>
          <h1>{props.title}</h1>
          <h5>{props.tagline}</h5>
          <p>{props.content}</p>
        </div>
        <div className="button_container">
          <button
            className="pin"
            style={{ color: props.pin === true ? "#395b64" : "" }}
            onClick={handlePin}
          >
            <PushPinIcon style={{ marginTop: "5px" }} />
          </button>
          <button className="delete" onClick={handleDelete}>
            <Delete />
          </button>
        </div>
      </div>
    </>
  );
}

export default Note;
