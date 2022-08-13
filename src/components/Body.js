// ######## imports ########

import { Alert } from "@mui/material";
import React, { useContext, useState } from "react";
import { ContextProvider } from "../Global/Context";
import CreateNote from "./CreateNote";
import Notes from "./Notes";
import PinnedNotes from "./PinnedNotes";

// ######## component ########

const Body = () => {
  // ######## global variables ########
  const { error, closeError } = useContext(ContextProvider);
  return (
    <div className="body_container">
      {error && (
        <Alert
          onClose={() => {
            closeError();
          }}
          className="alert"
          severity="error"
        >
          {error}
        </Alert>
      )}
      <CreateNote />
      <PinnedNotes />
      <Notes />
    </div>
  );
};

export default Body;
