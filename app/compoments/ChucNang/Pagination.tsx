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
    onPageChange(page);
  };

  useEffect(() => {
    // Ensure currentPage is within valid range when totalPages changes
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, onPageChange, totalPages]);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 2; // Số nút phân trang hiển thị tối đa
    const halfMaxButtons = Math.floor(maxButtons / 2);

    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

    if (currentPage <= halfMaxButtons) {
      endPage = Math.min(totalPages, maxButtons);
    }

    if (currentPage + halfMaxButtons >= totalPages) {
      startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    // Nút đầu tiên
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className="join-item btn btn-square px-3 py-1 mx-1 rounded-lg cursor-pointer bg-gray-200 text-gray-700"
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn btn-square px-3 py-1 mx-1 rounded-lg cursor-pointer ${
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

    // Nút cuối cùng
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="end-ellipsis">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          className="join-item btn btn-square px-3 py-1 mx-1 rounded-lg cursor-pointer bg-gray-200 text-gray-700"
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-end bottom-4">{renderPaginationButtons()}</div>
  );
};

export default Pagination;
