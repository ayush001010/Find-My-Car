import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const handlePrevious = () => {
    if (safeCurrentPage > 1) {
      onPageChange(safeCurrentPage - 1);
    }
  };

  const handleNext = () => {
    if (safeCurrentPage < totalPages) {
      onPageChange(safeCurrentPage + 1);
    }
  };

  // Determine button disabled states based on safeCurrentPage
  const isPrevDisabled = safeCurrentPage <= 1;
  const isNextDisabled = safeCurrentPage >= totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 mt-8 py-4">
      <button
        onClick={handlePrevious}
        disabled={isPrevDisabled}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-gray-300 transition-colors"
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <span className="text-gray-700" aria-live="polite" aria-atomic="true">
        Page {safeCurrentPage} of {totalPages}
      </span>

      {/* Placeholder for actual page number links/buttons */}
      {/* {pageNumbers.map(number => (...))} */}

      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-gray-300 transition-colors"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

// Define PropTypes for runtime checking
Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;