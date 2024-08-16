"use client";
import { FaShoppingCart } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useCart } from "@/app/components/CartContext";

interface Product {
  id: number;
  name: string;
  info: string;
  image: string;
  quantity: number;
  price: number;
  categoryId: number;
  createAt: string;
  updateAt: string;
  suggestedImages?: string[];
}

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const { addToCart } = useCart(); // Sử dụng useCart

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const MySwal = withReactContent(Swal);

  const handleAddToCart = async () => {
    if (selectedSize) {
      addToCart({
        ...product,
        quantity: 1,
        size: selectedSize,
        selected: false,
        addedAt: undefined,
      }); // Giả sử số lượng mặc định là 1
      await MySwal.fire({
        title: "Thông báo!",
        text: "Đã thêm sản phẩm vào giỏ hàng!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      await MySwal.fire({
        title: "Lỗi!",
        text: "Vui lòng chọn kích thước và nhập địa chỉ giao hàng.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover h-64 md:h-auto w-full md:w-1/2"
      />

      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {product.name}
        </h2>
        <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
          {product.info}
        </p>
        <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
          Số lượng: {product.quantity}
        </p>
        <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
          Giá: {product.price.toLocaleString()} VNĐ
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Chọn kích thước
          </h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`py-2 px-4 border rounded-lg ${
                  selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Nhập địa chỉ giao hàng
          </h3>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Nhập địa chỉ giao hàng"
            required
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex gap-2">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-lg rounded-lg border-2 ${
              selectedSize
                ? "border-red-500 text-red-500 bg-red-50 hover:bg-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            <FaShoppingCart />
            <span>Thêm Vào Giỏ Hàng</span>
          </button>

          <Link
            href={`/productpay?products=${encodeURIComponent(
              JSON.stringify([
                {
                  id: product.id,
                  name: product.name,
                  size: selectedSize,
                  price: product.price,
                  quantity: 1, // Hoặc số lượng bạn muốn
                  image: product.image,
                },
              ])
            )}&address=${encodeURIComponent(address)}`}
            className={`flex-1 flex items-center justify-center py-2 text-lg text-center rounded-lg ${
              selectedSize && address
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            Mua Ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
