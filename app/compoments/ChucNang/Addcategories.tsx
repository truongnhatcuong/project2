"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modal from "react-modal";

const AddCategory = (props: { closeHandle: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modalIsOpen] = useState(true);
  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    // kiểm tra nếu không đủ yêu cầu thì không được thêm vào
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

    try {
      //gửi yêu cầu lên api để tạo sản phẩm bằng phương thức POST
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        const data = await response.json(); //Nếu thành công sẽ thực hiện thêm sản phẩm
        console.log("Thêm thành công sản phẩm", data);
        // mỗi lần thêm sản phẩm tự động hiển thị không cần reload
        mutate("http://localhost:3000/api/categories");

        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: "Thông báo!",
          text: "Thêm sản Phẩm Thành Công",
          icon: "success",
          confirmButtonText: "OK",
        });
        props.closeHandle(); // thêm SP xong  thêm phương thức đóng trang post
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={props.closeHandle}
      contentLabel="Thêm sản phẩm mới"
      className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
      overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) "
    >
      <h2 className="text-xl font-bold">Thêm sản phẩm mới</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <input
            type="text"
            value={"ID Sẽ Được Tạo Tự Động"}
            className="p-2 rounded-lg border-solid border-2 w-full bg-gray-100"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            placeholder=" nhập tên sản phẩm ..."
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
            placeholder=" mô tả sản phẩm ..."
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={submitHandle}
        >
          Lưu
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-red-700"
          onClick={props.closeHandle}
        >
          Hủy
        </button>
      </form>
    </Modal>
  );
};

export default AddCategory;
