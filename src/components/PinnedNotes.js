// ######## imports ########

import React, { useContext } from "react";
import { ContextProvider } from "../Global/Context";
import Note from "./Note";

// ######## component ########

const PinnedNotes = () => {
  // ######## global variable ########
  const { notes } = useContext(ContextProvider);

  // ######## filtering pinned notes ########

  const pinnedNotes = notes.filter((noteItem) => {
    return noteItem.pin === true;
  });

  return (
    <div>
      {pinnedNotes.length !== 0 && (
        <h4 className="notesCategory_heading">Pinned</h4>
      )}
      <div className="notes_container">
        {pinnedNotes.map((noteItem, index) => {
          return (
            <Note
              key={noteItem.id}
              id={noteItem.id}
              title={noteItem.title}
              tagline={noteItem.tagline}
              content={noteItem.content}
              pin={noteItem.pin}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PinnedNotes;
