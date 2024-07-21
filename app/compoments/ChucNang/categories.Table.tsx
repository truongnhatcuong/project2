"use client";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryTableProps {
  categories: Category[];
  sortByNameOrder: "asc" | "desc";
  handleSortByName: () => void;
  openEditModal: (category: Category) => void;
  deleteHandle: (id: number) => void;
}

const CategoryTable = ({
  categories,
  sortByNameOrder,
  handleSortByName,
  openEditModal,
  deleteHandle,
}: CategoryTableProps) => {
  return (
    <table className="mt-4 w-full border-collapse border border-gray-300 mb-4 ">
      <thead className="bg-gray-200">
        <tr className="bg-slate-600 text-white">
          <th className="border border-gray-300 px-4 py-1">ID</th>
          <th className="border border-gray-300 px-4 py-2">
            Tên
            <button onClick={handleSortByName} className="ml-6">
              {sortByNameOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </th>
          <th className="border border-gray-300 px-4 py-1">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {category.id}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {category.name}
            </td>
            <td className="border border-gray-300 px-4 py-2 flex justify-center">
              <button
                className="bg-yellow-300 hover:bg-yellow-400 text-white py-1 px-3 rounded-md mr-2"
                onClick={() => openEditModal(category)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                onClick={() => deleteHandle(category.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
