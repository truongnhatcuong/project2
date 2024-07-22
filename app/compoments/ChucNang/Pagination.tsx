import React, { useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  useEffect(() => {
    // Ensure currentPage is within valid range when totalPages changes
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, onPageChange, totalPages]);

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPagesToShow = 3; // Số nút trang hiển thị tối đa
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfTotalPagesToShow);
    let endPage = Math.min(totalPages, currentPage + halfTotalPagesToShow);

    // Điều chỉnh startPage và endPage nếu chúng nằm ngoài phạm vi
    if (endPage - startPage + 1 < totalPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - totalPagesToShow + 1);
      }
    }

    // Nút trang
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn btn-square px-3 py-1 rounded-lg cursor-pointer ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-end space-x-2 py-4 mr-4">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
