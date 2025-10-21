import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage > 2) {
        pageNumbers.push(1);
        if (currentPage > 3) {
          pageNumbers.push("...");
        }
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft />
      </button>

      {/* Page Numbers */}
      {renderPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-4 py-2 text-gray-500 cursor-default">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded ${
              page === currentPage
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-black hover:text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
export default Pagination;