"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface CategoryItem {
  id: number;
  name: string;
  description: string;
}

const UpdateCategories = ({
  closeHandle,
  category,
}: {
  closeHandle: () => void;
  // id: number;
  category: CategoryItem;
}) => {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [isLoading, setLoading] = useState(true);
  const [modalIsOpen] = useState(true);
  const MySwal = withReactContent(Swal);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const updateHandle = async (e: any) => {
    e.preventDefault();
    if (name.length < 8 || name.length > 255 || !name) {
      toast.error("Vui lòng nhập từ 8 đến 255 ký tự cho tên.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    if (description.length < 8 || description.length > 255 || !description) {
      toast.error("Vui lòng nhập từ 8 đến 255 ký tự cho description.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setLoading(true);
    const response = await fetch(
      `http://localhost:3000/api/categories/${category.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      }
    );
    setLoading(false);
    if (response.ok) {
      const data = await response.json();
      console.log("Cập nhật thành công", data);
      mutate("http://localhost:3000/api/categories"); // Làm mới dữ liệu từ SWR
      MySwal.fire({
        title: "Thông báo!",
        text: "Cập nhật sản phẩm thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      closeHandle();
    }

    if (isLoading)
      // Nếu isLoading là true thì hiển thị chỉ số loading
      return (
        <p className="flex justify-center">
          <span className="loading loading-dots loading-lg "></span>
        </p>
      );
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeHandle}
      contentLabel="cập nhật phẩm mới"
      className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
      overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) pointer-events: none"
    >
      <h2 className="text-xl font-bold">Cập Nhật Danh Mục</h2>
      <form className="mt-4" onSubmit={updateHandle}>
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <input
            type="text"
            value={category.id}
            className="p-2 rounded-lg border-solid border-2 w-full bg-gray-100"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>
        <button
          className="bg-yellow-300 text-white py-2 px-4 rounded-md hover:bg-yellow-500"
          type="submit"
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-red-700"
          onClick={closeHandle}
        >
          Hủy
        </button>
      </form>
    </Modal>
  );
};

export default UpdateCategories;
