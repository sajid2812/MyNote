// ######## imports ########

import React, { useContext } from "react";
import { usePagination, DOTS } from "./usePagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ContextProvider } from "../Global/Context";

// ######## component ########

const Pagination = (props) => {
  // ######## global variables ########
  const { updateCurrentPage } = useContext(ContextProvider);

  // ######## props ########
  const { totalCount, siblingCount = 1, currentPage, pageSize } = props;

  // ######## pagination range ########

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // ######## edge cases ########

  if (currentPage === 0) {
    return null;
  }

  if (paginationRange.length < 2) {
    updateCurrentPage(1);
  }

  // ######## handling click previous ########

  const onPrevious = () => {
    if (currentPage !== 1) {
      updateCurrentPage(currentPage - 1);
    }
  };

  // ######## handling click next ########

  const onNext = () => {
    if (currentPage !== lastPage) {
      updateCurrentPage(currentPage + 1);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination-container">
      <li className="pagination-item" onClick={onPrevious}>
        <div className="arrow left" />
        <ChevronLeftIcon />
      </li>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={idx} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={idx}
            className="pagination-item"
            style={{
              backgroundColor:
                currentPage - 1 === idx ? "rgba(0, 0, 0, 0.08)" : "",
            }}
            onClick={() => updateCurrentPage(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className="pagination-item" onClick={onNext}>
        <div className="arrow right" />
        <ChevronRightIcon />
      </li>
    </ul>
  );
};

export default Pagination;
