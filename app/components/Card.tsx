"use client";

import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "./CartContext";

interface IProduct {
  id: number;
  name: string;
  info: string;
  image: string;
  quantity: number;
  price: number;
  categoryId: number;
  createAt: string;
  updateAt: string;
}

interface IProductInfo {
  card: IProduct;
}

export default function Card({ card }: IProductInfo) {
  const { addToCart } = useCart();
  const MySwal = withReactContent(Swal);

  const handleAddToCart = () => {
    addToCart({
      id: card.id,
      name: card.name,
      price: card.price,
      quantity: 1, // Số lượng mặc định là 1
      image: card.image,
      size: "", // Kích thước mặc định là rỗng
      selected: true,
      addedAt: undefined,
    });
    MySwal.fire({
      title: "Thông báo!",
      text: "Sản phẩm đã được thêm vào giỏ hàng",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="card bg-slate-100 dark:bg-gray-800 w-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-5 mr-3">
      <div className="relative h-96">
        <img
          src={card.image}
          alt={card.name}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="card-body p-4 text-gray-800 dark:text-gray-200">
        <h2 className="card-title text-lg font-semibold mb-2">{card.name}</h2>
        <p className="text-sm mb-2">{card.info}</p>
        <p className="text-sm mb-4">Giá: {card.price.toLocaleString()} VNĐ</p>
        <div className="card-actions flex justify-between items-center w-full">
          <button
            className="btn flex items-center space-x-2 border-red-500 text-red-500 bg-red-50 hover:bg-white"
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            <span>Thêm vào Giỏ Hàng</span>
          </button>
          <Link href={`/product/${card.id}`}>
            <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Xem Chi Tiết
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
