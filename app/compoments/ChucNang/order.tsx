import React from "react";

const Order = ({
  onSortChange,
}: {
  onSortChange: (sortOrder: string) => void;
}) => {
  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const order = event.target.value;
    onSortChange(order); // Gọi hàm callback để thông báo về sự thay đổi sortOrder
  };

  return (
    <div className="">
      <label className="block ">Sắp xếp theo:</label>
      <select
        className="p-2 border border-gray-300 rounded-md"
        onChange={handleSortOrderChange} // Xử lý sự kiện thay đổi
      >
        <option value="">Không sắp xếp</option>
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select>
    </div>
  );
};

export default Order;
