"use client";
import React from "react";
import { useCart } from "../components/CartContext";
import Link from "next/link";

const CartPopover: React.FC = () => {
  const { cart } = useCart(); // Đảm bảo CartProvider bao bọc các thành phần này

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md p-4 z-20">
      <h4 className="text-xl font-bold mb-2 text-black">Giỏ hàng của bạn</h4>
      {cart.length === 0 ? (
        <p className="text-gray-600">Giỏ hàng đang trống</p>
      ) : (
        <ul>
          {cart.slice(0, 4).map((item) => (
            <li
              key={item.id}
              className="flex items-center mb-2 hover:bg-slate-200"
            >
              <Link href={`/product/${item.id}`} className="flex items-center">
                <img
                  alt={item.name}
                  src={item.image}
                  className="w-12 h-12 rounded-md mr-2 object-cover"
                />
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-red-600">
                    {item.price.toLocaleString()} VNĐ
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/cart"
        className="block text-white hover:bg-red-400 p-2 bg-red-500 w-35 h-10 text-center font-bold"
      >
        Xem giỏ hàng
      </Link>
    </div>
  );
};

export default CartPopover;
