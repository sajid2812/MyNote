// ######## imports ########

import React, { useContext, useMemo } from "react";
import { ContextProvider } from "../Global/Context";
import Note from "./Note";
import Pagination from "./Pagination";

// max number of notes per page (excluding pinned notes)
let PageSize = 6;

// ######## component ########

const Notes = () => {
  // ######## global variables ########
  const { notes, currentPage } = useContext(ContextProvider);

  // ######## filtering unPinnedNotes ########

  const unPinnedNotes = notes.filter((noteItem) => {
    return noteItem.pin !== true;
  });

  // ######## cuurentPage's unPinnedNotes ########

  const currentPageData = useMemo(() => {
    const firstpageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstpageIndex + PageSize;

    return unPinnedNotes.slice(firstpageIndex, lastPageIndex);
  }, [currentPage, notes]);

  return (
    <div>
      {currentPageData.length !== 0 && (
        <h4 className="notesCategory_heading">Others</h4>
      )}

      <div className="notes_container">
        {currentPageData.map((noteItem, index) => {
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
      <Pagination
        currentPage={currentPage}
        totalCount={unPinnedNotes.length}
        pageSize={PageSize}
      />
    </div>
  );
};

export default Notes;
